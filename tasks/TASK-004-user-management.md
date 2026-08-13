# TASK-004 — User management

## Objective

Let owners and admins view all users and change a user's role, with
authorization enforced server-side and in the database.

## Objective scope

First real feature. Exercises `requireRole`, `DataTable`, `ConfirmDialog`, and
role-filtered navigation. Not in scope: inviting/creating users (needs the
service-role admin API) and deleting users — deferred to a later task.

## Context

Builds on TASK-001/002/003. Relevant docs: `docs/SECURITY.md` (authz),
`docs/UI.md`. Profiles + RLS from `supabase/migrations/0001_profiles.sql`.

## Requirements

- `/users` page under the `(app)` shell, restricted to `owner` and `admin`
  (`requireRole`). A matching nav item visible only to those roles.
- List all profiles in a `DataTable` (name, email, role, joined).
- Change a user's role via a server action that re-checks authorization and
  applies these business rules:
  - Only owner/admin may change roles.
  - A user cannot change their own role (prevents self-lockout).
  - Only an owner may assign or modify the `owner` role.
- The change is confirmed via `ConfirmDialog` and cannot be double-submitted.
- Tighten the profiles UPDATE RLS policy so the same owner/admin rules hold in
  the database, not only in the app.

## Constraints

- No new dependencies. Reuse shared components and the native/existing UI.
- Feature code lives under `src/features/users/`.
- Keep the permission logic pure and unit-tested.

## Acceptance Criteria

- [ ] Non-privileged users are redirected away from `/users`
- [ ] Role change works and refreshes the list; self and owner rules enforced
- [ ] Permission logic has passing unit tests
- [ ] Typecheck / lint / tests pass; production build succeeds
