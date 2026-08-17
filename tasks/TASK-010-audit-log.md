# TASK-010 — Audit log

## Objective

Record significant administrative actions (role changes, invites, settings
updates) and let owners/admins review them.

## Context

Builds on TASK-004/007/009. Provides accountability for privileged actions.
Docs: `docs/SECURITY.md`, `docs/DATABASE.md`.

## Requirements

- `audit_logs` table (actor, action, target, metadata, timestamp). RLS: only
  owner/admin may read. Inserts go through a `SECURITY DEFINER` `log_event`
  function that captures the actor from the session — clients cannot forge the
  actor or insert arbitrary rows.
- A server helper `logEvent(...)` (best-effort; never breaks the main action).
- Emit events from: role change, user invite, settings update.
- `/audit` page (owner/admin) listing recent events in a DataTable with an
  empty state. "Activity" nav item for owner/admin.

## Constraints

- No new dependencies. Reuse DataTable, PageHeader, EmptyState.
- Logging failures must not fail the underlying action.

## Acceptance Criteria

- [ ] Privileged actions create audit rows with the correct actor
- [ ] Only owner/admin can read `/audit`
- [ ] Typecheck / lint / tests pass; build succeeds
