# TASK-005 — Account & profile settings

## Objective

Let any signed-in user manage their own account: update their display name and
change their password.

## Context

Builds on TASK-001/002/003. Self-service counterpart to TASK-004 (which is
admin-managed). Uses the "update own profile" RLS path and Supabase Auth.
Relevant docs: `docs/SECURITY.md`, `docs/UI.md`.

## Requirements

- `/account` page inside the `(app)` shell, available to every authenticated role.
- Update profile: change `full_name`. Email is shown read-only (changing email
  needs re-verification — deferred).
- Change password: require the current password (re-authenticate before update),
  then set a new password (min 8) with confirmation.
- Forms use React Hook Form + Zod with idle/loading/error/success states and no
  duplicate submits. Success refreshes so the shell reflects the new name.
- Promote the generic `Field` / `FormStatus` form helpers to `components/shared`
  so both auth and account reuse them (single source).

## Constraints

- No new dependencies. Reuse shared components and existing patterns.
- Authorization: users act only on their own account; never expose another
  user's data. Password change re-authenticates first (SECURITY.md).
- Feature code under `src/features/account/`.

## Acceptance Criteria

- [ ] Name update persists and the header reflects it
- [ ] Password change requires a correct current password; wrong current fails
- [ ] Validation works client and server; no duplicate submit
- [ ] Typecheck / lint / tests pass; production build succeeds
