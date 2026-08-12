# 003. Authentication strategy

## Context

Every customer app needs user authentication and role-based authorization.
Building this per customer is wasteful and risky.

## Decision

Use Supabase Auth for authentication, with a reusable `auth` feature in the
master starter. Authorization is role-based (Owner, Admin, Staff, Employee,
Customer) and enforced server-side and via Row Level Security.

## Reason

- Supabase Auth integrates directly with Postgres RLS.
- A shared `auth` feature gives every customer a consistent, tested base.
- Enforcing permissions in the database prevents "hidden button" pseudo-security.

## Alternatives considered

- **Custom JWT auth** — more code and more security surface to maintain per
  project. Rejected.
- **Third-party auth (e.g. Auth0/Clerk)** — extra dependency and cost;
  duplicates what Supabase already provides. Rejected for the default.

## Consequences

- Authentication and authorization are treated as distinct concerns.
- Roles and permissions are explicit; UI checks are never the only enforcement.
- The `auth` feature is reusable starter code and must stay customer-agnostic.
