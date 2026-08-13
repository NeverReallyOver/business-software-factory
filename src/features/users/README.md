# features/users/

User management for owners and admins. Reusable across projects.

## Contents

- `queries.ts` — `listProfiles()` (RLS restricts the select to owner/admin).
- `actions.ts` — `updateUserRole(userId, role)` server action; re-checks
  authorization and applies the business rules.
- `permissions.ts` — pure `roleChangeError(...)` rules (unit-tested).
- `components/users-table.tsx` — table with per-row role change confirmed via
  `ConfirmDialog`.

## Rules

- Page is gated with `requireRole(["owner", "admin"])`.
- Only owner/admin change roles; no one changes their own role; only an owner
  may assign or modify the `owner` role.
- The same rules are enforced in the database via the `profiles_update_privileged`
  RLS policy (`supabase/migrations/0001_profiles.sql`).

## Not included (deferred)

Inviting/creating users (needs the service-role admin API) and deleting users.
