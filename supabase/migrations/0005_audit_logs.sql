-- 0005_audit_logs.sql
-- Audit trail for privileged actions. Reads are owner/admin only. Inserts go
-- through log_event (SECURITY DEFINER), which captures the actor from the
-- session so clients cannot forge the actor or insert arbitrary rows.

create table public.audit_logs (
  id          uuid primary key default gen_random_uuid(),
  actor_id    uuid references auth.users (id) on delete set null,
  actor_email text,
  action      text not null,
  target_type text,
  target_id   text,
  metadata    jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now()
);

create index audit_logs_created_at_idx on public.audit_logs (created_at desc);

alter table public.audit_logs enable row level security;

-- Owners and admins can read the audit log. No insert/update/delete policies:
-- writes happen only via log_event (SECURITY DEFINER) below.
create policy "audit_logs_select_privileged"
  on public.audit_logs for select
  to authenticated
  using (public.current_user_role() in ('owner', 'admin'));

create or replace function public.log_event(
  p_action text,
  p_target_type text default null,
  p_target_id text default null,
  p_metadata jsonb default '{}'::jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text;
begin
  if auth.uid() is null then
    return;
  end if;

  select email into v_email from public.profiles where id = auth.uid();

  insert into public.audit_logs (actor_id, actor_email, action, target_type, target_id, metadata)
  values (auth.uid(), v_email, p_action, p_target_type, p_target_id, coalesce(p_metadata, '{}'::jsonb));
end;
$$;

grant execute on function public.log_event(text, text, text, jsonb) to authenticated;
