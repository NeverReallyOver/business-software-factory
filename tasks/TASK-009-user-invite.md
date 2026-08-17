# TASK-009 — Invite users

## Objective

Let owners/admins invite a new user by email with a chosen role. The invitee
receives an email, sets a password, and lands in the app with the assigned role.

## Context

Builds on TASK-004 (user management). Uses the Supabase Admin API, which
requires the service-role key (server-only). Docs: `docs/SECURITY.md`.

## Requirements

- Server-only admin client using `SUPABASE_SERVICE_ROLE_KEY` (never client-side).
- Invite action (owner/admin): sends `inviteUserByEmail`; admins may not invite
  owners. Fails gracefully if the server key is not configured, and does not
  reveal whether an email is already registered.
- Assigned role is honored **securely**: a `user_invites` table (writable only
  by the server/trigger) records the intended role; the signup trigger reads it
  and assigns the role, then deletes the invite. User-supplied signup metadata is
  never trusted for role (public anon signups could forge it otherwise).
- Invite UI on `/users` (email + role); success toast; list refreshes.

## Constraints

- No new dependencies (`@supabase/supabase-js` is already present).
- Service-role key must stay server-only. Reuse shared form helpers and toast.

## Acceptance Criteria

- [ ] Owner/admin can send an invite; admin cannot assign owner
- [ ] Invited user, after accepting, has the assigned role (via the invites table)
- [ ] Public self-signup cannot forge a role
- [ ] Typecheck / lint / tests pass; build succeeds
