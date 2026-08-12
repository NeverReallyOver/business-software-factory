# SECURITY.md

Security is mandatory and is the highest priority (see rule 50).

## Secrets

- Never expose API secrets, service-role keys, credentials, database passwords,
  or environment secrets.
- Never commit secrets to Git. Use environment variables (`.env.local`), which
  is git-ignored.
- The Supabase **service-role key** is server-only. Never ship it to the client.
- The Supabase **anon key** is public but must be paired with RLS.

## Authentication vs Authorization

- **Authentication** — who the user is. Handled by Supabase Auth.
- **Authorization** — what the user may do. Enforced explicitly, server-side and
  in the database.

Hiding a UI button is **not** security. The underlying operation must also
enforce the permission.

## Roles

Typical roles: Owner, Admin, Staff, Employee, Customer. Permissions must be
explicit per role and checked where the action is performed.

## Row Level Security

- Enable RLS on every table with customer data.
- Write policies scoped to the authenticated user / tenant.
- Never assume frontend visibility equals authorization.

## Input handling

- Never trust user input. Validate all external data with Zod at the boundary.
- Validate again server-side even if the client already validated.

## Error exposure

Do not leak internal technical details (stack traces, SQL, keys) to end users.
Log details server-side; show understandable messages to customers.
