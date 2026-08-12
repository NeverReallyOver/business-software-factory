# 001. Use Supabase as the backend platform

## Context

The software factory builds many small/medium business apps that each need
authentication, a relational database, storage, and row-level authorization,
with low maintenance overhead and fast setup per customer.

## Decision

Use Supabase (PostgreSQL, Auth, Storage, Row Level Security) as the standard
backend platform for all customer projects.

## Reason

- One managed platform covers auth, database, storage, and authorization.
- PostgreSQL gives real relational integrity and constraints.
- RLS enforces authorization in the database, not just the UI.
- Fast per-customer provisioning; low operational burden.

## Alternatives considered

- **Custom Node/Express + self-managed Postgres** — more control, far more
  maintenance per customer. Rejected for a factory model.
- **Firebase** — good DX but document store weakens relational integrity and
  reporting. Rejected in favor of SQL.

## Consequences

- Each customer gets an isolated Supabase project.
- RLS policies are mandatory on customer-data tables.
- The service-role key is server-only and never shipped to the client.
