# features/account/

Self-service account settings for the signed-in user (any role). The
admin-managed counterpart is `features/users/`.

## Contents

- `schemas.ts` — Zod schemas for profile and password change.
- `actions.ts` — `updateProfile` (own `full_name`) and `changePassword`
  (re-authenticates with the current password before updating).
- `components/profile-form.tsx`, `components/password-form.tsx` — RHF + Zod forms.

Page: `src/app/(app)/account/page.tsx`, linked from the shell header. Uses the
shared `Field` / `FormStatus` helpers in `components/shared/`.

## Notes

- Users only ever act on their own account (`requireUser` + own-profile RLS).
- Changing email is deferred (needs re-verification).
