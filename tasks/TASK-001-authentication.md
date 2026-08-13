# TASK-001 — Authentication feature

## Objective

Deliver the reusable authentication and role foundation for the master starter:
Supabase Auth sign-in/sign-up/sign-out, password reset, a `profiles` table with
roles and RLS, session middleware with route protection, and server-side
authorization helpers.

## Context

First reusable feature of the starter (see `docs/decisions/003-authentication-strategy.md`).
Everything else (dashboard, user management, customer features) depends on it.
Relevant docs: `docs/SECURITY.md`, `docs/DATABASE.md`, `docs/ARCHITECTURE.md`.
Supabase client/server helpers already exist in `src/lib/supabase/`.

## Requirements

- `profiles` table linked to `auth.users`, with a `role` enum
  (owner, admin, staff, employee, customer) and RLS. New auth users get a
  profile automatically; the first user becomes `owner`.
- Zod schemas for login, signup, forgot-password, reset-password.
- Server actions: sign in, sign up, sign out, request password reset, update
  password. Validate input server-side; never leak internal errors.
- Server helpers: `getUser`, `getProfile`, `requireUser`, `requireRole`.
- Session middleware that refreshes the Supabase session, protects app routes,
  and redirects authenticated users away from auth pages.
- Auth callback route handler for email confirmation / recovery links.
- Client forms (React Hook Form + Zod) for login, signup, forgot/reset password
  with idle/loading/error/success states and no duplicate submits.
- Auth route group + a minimal protected landing so auth works end-to-end
  (full dashboard layout is TASK-002).

## Constraints

- Use existing shared UI (`@base-ui/react` shadcn primitives) and `cn`.
- Authorization enforced server-side and in the DB, not by hiding UI (rule 19).
- Never expose the service-role key; anon key + RLS only (SECURITY.md).
- Keep the feature customer-agnostic (rule 42). No unrequested features.

## Acceptance Criteria

- [ ] Sign up → email/session → protected route reachable; sign out works
- [ ] Unauthenticated access to a protected route redirects to `/login`
- [ ] Zod validation works on client and server
- [ ] `requireRole` blocks unauthorized roles server-side
- [ ] Typecheck passes
- [ ] Lint passes
- [ ] Schema + role-helper tests pass
