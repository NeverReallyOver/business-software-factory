-- 0002_app_settings.sql
-- Singleton workspace/organization settings. Exactly one row (id = 1).
-- Any authenticated user may read; only an owner may update (RLS).

create table public.app_settings (
  id            smallint primary key default 1,
  app_name      text not null default 'Business Software Factory',
  support_email text,
  updated_at    timestamptz not null default now(),
  constraint app_settings_singleton check (id = 1)
);

comment on table public.app_settings is 'Single-row workspace configuration.';

-- Seed the single row.
insert into public.app_settings (id) values (1);

-- Keep updated_at current (reuses set_updated_at from 0001).
create trigger app_settings_set_updated_at
  before update on public.app_settings
  for each row execute function public.set_updated_at();

alter table public.app_settings enable row level security;

-- Everyone signed in can read settings (the shell needs the app name).
create policy "app_settings_select_authenticated"
  on public.app_settings for select
  to authenticated
  using (true);

-- Only owners can change settings.
create policy "app_settings_update_owner"
  on public.app_settings for update
  to authenticated
  using (public.current_user_role() = 'owner')
  with check (public.current_user_role() = 'owner');
