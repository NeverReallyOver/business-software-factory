# DATABASE.md

## Platform

PostgreSQL via Supabase. Schema changes must be reproducible through migrations
— never make undocumented manual changes in the dashboard.

## Design principles

Before creating a table, define: entities, relationships, ownership, roles,
permissions, lifecycle, required vs optional fields, indexes, and constraints.

Prefer database constraints over application-only checks:

- Primary keys on every table
- Foreign keys for relationships
- Unique constraints where duplicates are invalid
- NOT NULL on required fields
- Appropriate data types (`timestamptz`, `numeric` for money, etc.)
- Indexes on frequently filtered/joined columns

## Row Level Security (RLS)

RLS is **on** for all tables holding customer data. Never rely on the frontend
to hide data — authorization is enforced in the database. See `SECURITY.md`.

## Conventions

- Table names: `snake_case`, plural (e.g. `members`, `payments`).
- Timestamps: `created_at timestamptz default now()`, `updated_at`.
- Primary keys: `id uuid default gen_random_uuid()`.
- Money: store as integer minor units or `numeric`, never float.

## Migrations workflow

1. Create/modify migration in the Supabase migrations directory.
2. Apply to local/staging and verify.
3. Regenerate TypeScript types into `src/types/`.
4. Update this document if the schema meaning changes.
5. Check dependent code.

## Reusable (master starter) tables

Only genuinely reusable tables live in the starter (e.g. profiles/users, roles).
Customer-specific tables live in the customer project.
