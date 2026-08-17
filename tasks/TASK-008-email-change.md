# TASK-008 — Email change

## Objective

Let a signed-in user change their account email, with confirmation, and keep the
`profiles.email` column in sync.

## Context

Completes the item deferred in TASK-005. Uses Supabase Auth email change (which
sends a confirmation link). Docs: `docs/SECURITY.md`.

## Requirements

- Change-email form on `/account`: new email + current password (re-auth first).
- Action calls Supabase to update the email; Supabase emails a confirmation link
  to the new address (routed through `/auth/callback`).
- A DB trigger syncs `auth.users.email` → `profiles.email` after confirmation.
- Success feedback via toast; do not leak whether the target email exists.

## Constraints

- No new dependencies. Reuse shared form helpers and toast.
- Re-authenticate with the current password before changing email (SECURITY.md).

## Acceptance Criteria

- [ ] Submitting a new email + correct current password sends a confirmation
- [ ] Wrong current password is rejected
- [ ] After confirmation, `profiles.email` matches the new email
- [ ] Typecheck / lint / tests pass; build succeeds
