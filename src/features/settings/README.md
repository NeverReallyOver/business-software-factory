# features/settings/

Owner-managed workspace/organization settings (app name, support email).

## Contents

- `queries.ts` — `getAppSettings()` reads the singleton row; returns a safe
  default (from `config/app.ts`) if unavailable.
- `schemas.ts` — Zod schema for the settings form.
- `actions.ts` — `updateAppSettings` server action (owner only; RLS mirrors it).
- `components/settings-form.tsx` — RHF + Zod form with a success toast.

Page: `src/app/(app)/settings/page.tsx` (owner only). The `(app)` shell reads
`getAppSettings()` and renders `app_name` as the branding, so each deployment is
branded without code changes.

Table: `app_settings` (single row, id = 1) in
`supabase/migrations/0002_app_settings.sql`.
