-- 0004_user_invites.sql
-- Secure role assignment for invited users. The role is stored server-side in
-- user_invites (never in user-supplied signup metadata, which anon clients could
-- forge). The signup trigger reads the invite, assigns the role, and clears it.

create table public.user_invites (
  email      text primary key,
  role       public.user_role not null default 'customer',
  invited_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

comment on table public.user_invites is 'Pending role assignments for invited users, consumed on signup.';

-- RLS on with NO policies: only the service-role key and SECURITY DEFINER
-- functions (the signup trigger) can touch this table. Normal clients cannot.
alter table public.user_invites enable row level security;

-- Replace the signup handler so it honors a pending invite when present.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  assigned_role public.user_role;
  invite public.user_invites%rowtype;
begin
  if not exists (select 1 from public.profiles) then
    -- First user is always the owner.
    assigned_role := 'owner';
  else
    select * into invite from public.user_invites where email = new.email;
    if found then
      assigned_role := invite.role;
      delete from public.user_invites where email = new.email;
    else
      assigned_role := 'customer';
    end if;
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
