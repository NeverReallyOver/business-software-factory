# DEVELOPMENT.md

## Prerequisites

- Node.js LTS + npm
- A Supabase project (local via Supabase CLI, or a cloud project)

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in Supabase values
npm run dev
```

## Environment variables

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=       # server-only, never exposed to client
NEXT_PUBLIC_SITE_URL=            # public URL for auth email redirects (prod)
```

## Database migrations

SQL migrations live in `supabase/migrations/`. Apply them with the Supabase CLI
(`supabase db push`, or `supabase db reset` locally). `0001_profiles.sql`
provides the reusable `profiles` table, `user_role` enum, and RLS used by the
`auth` feature.

## Scripts (expected)

```bash
npm run dev          # start dev server
npm run build        # production build
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm run test         # vitest
npm run test:e2e     # playwright (important flows)
```

Use the actual scripts present in `package.json`. Do not claim a check passed
unless it was actually run.

## Development loop (every task)

```text
READ → UNDERSTAND → INSPECT → PLAN → IMPLEMENT → VALIDATE → REVIEW → REPORT
```

1. Read `CLAUDE.md` and the task.
2. Read only the relevant docs and code.
3. Reuse existing components/utilities; make the smallest correct change.
4. Handle loading / empty / error / success states.
5. Run lint, typecheck, and tests before declaring done.
6. Report using the format in rule 37.

## Tasks

Define work as a task using `tasks/TEMPLATE.md`. Implement only that task; do not
add unrequested features or refactor unrelated code.

## Git

Focused commits with clear prefixes: `feat:`, `fix:`, `refactor:`, `test:`,
`docs:`. Do not mix unrelated changes.
