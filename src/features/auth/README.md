# features/auth/

Reusable authentication feature (Supabase Auth). Keep customer-agnostic.

## Contents

- `schemas.ts` — Zod schemas for login, signup, forgot/reset password.
- `actions.ts` — server actions (`signIn`, `signUp`, `signOut`,
  `requestPasswordReset`, `updatePassword`). Re-validate input server-side.
- `server.ts` — server-side auth/authorization helpers: `getUser`,
  `getProfile`, `requireUser`, `requireRole`.
- `components/` — client forms (React Hook Form + Zod) and shared field/status.

## Usage

- Protect a server component or action: `await requireUser()` or
  `await requireRole(["owner", "admin"])`.
- Session refresh and route protection run in root `middleware.ts` via
  `lib/supabase/middleware.ts`.
- Roles and RLS live in `supabase/migrations/0001_profiles.sql`. The first
  registered user becomes `owner`.

Authorization is enforced server-side and in the database (RLS) — never by
hiding UI (see `docs/SECURITY.md`).
