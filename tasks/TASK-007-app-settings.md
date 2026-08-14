# TASK-007 — App / organization settings

## Objective

Let an owner configure workspace-level settings (app name, support email) stored
in the database, and use the app name across the shell so each customer
deployment is branded without code changes.

## Context

Builds on TASK-001–006. Complements per-user account settings (TASK-005) with
org-level config. App name is currently a hardcoded constant (`config/app.ts`);
this makes it data-driven with a safe default. Docs: `docs/SECURITY.md`,
`docs/DATABASE.md`.

## Requirements

- A singleton `app_settings` table (exactly one row) with `app_name` (required)
  and `support_email` (optional), seeded with the default name. RLS: any
  authenticated user may read; only an owner may update.
- `/settings` page (owner only) with a form to edit the settings; success toast.
- The `(app)` shell shows the DB app name (falling back to the config default).
- Add a "Settings" nav item visible only to owners.

## Constraints

- No new dependencies. Reuse shared form helpers, toast, and patterns.
- Authorization enforced server-side (`requireRole(["owner"])`) and in RLS.
- Feature code under `src/features/settings/`.

## Acceptance Criteria

- [ ] Only owners can open `/settings` and update settings
- [ ] Updating the app name changes the shell branding after refresh
- [ ] Validation works client + server; success toast fires
- [ ] Typecheck / lint / tests pass; production build succeeds
