-- 0003_sync_profile_email.sql
-- Keep profiles.email in sync when a user's auth email changes (after the user
-- confirms the change via the emailed link).

create or replace function public.handle_user_email_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.email is distinct from old.email then
    update public.profiles set email = new.email where id = new.id;
  end if;
  return new;
end;
$$;

create trigger on_auth_user_email_change
  after update of email on auth.users
  for each row execute function public.handle_user_email_change();
