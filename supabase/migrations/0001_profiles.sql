-- 0001_profiles.sql
-- Reusable auth foundation: user roles + profiles linked to auth.users.
-- Authorization is enforced in the database via RLS (see docs/SECURITY.md).

-- Roles available across every customer project.
create type public.user_role as enum ('owner', 'admin', 'staff', 'employee', 'customer');

create table public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  email      text not null,
  full_name  text,
  role       public.user_role not null default 'customer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'Per-user profile and role, one row per auth.users row.';

-- Keep updated_at current.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Auto-create a profile when a new auth user is created.
-- The very first user becomes 'owner'; everyone else defaults to 'customer'.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  assigned_role public.user_role;
begin
  if exists (select 1 from public.profiles) then
    assigned_role := 'customer';
  else
    assigned_role := 'owner';
  end if;

  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    nullif(new.raw_user_meta_data ->> 'full_name', ''),
    assigned_role
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helper used by policies to read the caller's role without recursing on RLS.
create or replace function public.current_user_role()
returns public.user_role
language sql
security definer
stable
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

-- Row Level Security.
alter table public.profiles enable row level security;

-- A user can always read their own profile.
create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

-- Owners and admins can read every profile (staff/user management).
create policy "profiles_select_privileged"
  on public.profiles for select
  to authenticated
  using (public.current_user_role() in ('owner', 'admin'));

-- A user can update their own profile, but not change their own role.
create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid() and role = (select role from public.profiles where id = auth.uid()));

-- Owners and admins manage OTHER users' profiles/roles. The rules mirror the
-- app (see features/users/permissions.ts): you cannot change your own role
-- here (own edits go through profiles_update_own), and only an owner may target
-- or assign the owner role.
create policy "profiles_update_privileged"
  on public.profiles for update
  to authenticated
  using (
    id <> auth.uid()
    and (
      public.current_user_role() = 'owner'
      or (public.current_user_role() = 'admin' and role <> 'owner')
    )
  )
  with check (
    id <> auth.uid()
    and (
      public.current_user_role() = 'owner'
      or (public.current_user_role() = 'admin' and role <> 'owner')
    )
  );

-- Inserts happen via the handle_new_user trigger (security definer); no direct
-- client insert policy is granted. Deletes cascade from auth.users.
