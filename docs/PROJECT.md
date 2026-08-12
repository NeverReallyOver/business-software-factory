# PROJECT.md

## Overview

This is the **master starter** for the Business Software Factory — a reusable
base for building professional software for small and medium businesses (gyms,
restaurants, salons, clinics, shops, coaching centres, service businesses).

See `CLAUDE.md` at the repository root for the full engineering rules.

## Goals

- Ship customer products fast by reusing a proven base.
- Keep architecture simple, consistent, and secure.
- Contain only genuinely reusable functionality in this starter (see rule 42).

## What lives here

Reusable across every customer project:

- Authentication and user management
- Roles and authorization
- Dashboard layout and navigation
- Shared UI components, forms, tables, validation
- Common utilities and database patterns

## What does NOT live here

Customer-specific business features (gym membership, restaurant kitchen, salon
appointments) and any customer secrets, data, or credentials. Those belong in
the individual customer project derived from this starter.

## How a new customer project starts

1. Copy/clone this starter.
2. Configure environment (`.env.local`) with the customer's Supabase project.
3. Add customer-specific features under `src/features/`.
4. Track work through `tasks/` using `tasks/TEMPLATE.md`.
