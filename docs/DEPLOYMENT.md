# DEPLOYMENT.md

## Targets

- **Frontend:** Vercel (Next.js)
- **Backend / DB / Auth / Storage:** Supabase

## Environments

- **Development** — local, local or dev Supabase project.
- **Staging** — optional preview environment for verification.
- **Production** — customer-facing.

Each customer project is deployed independently with its own Supabase project
and its own environment variables.

## Environment variables (per environment)

Set in the Vercel project settings — never commit them:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY        # server-only
```

## Deploy checklist

1. `npm run lint` and `npm run typecheck` pass.
2. `npm run test` (and `test:e2e` for important flows) pass.
3. Database migrations applied to the target Supabase project.
4. Generated types regenerated and committed.
5. Environment variables configured in Vercel.
6. RLS policies verified on the target project (see `SECURITY.md`).

## Database changes

Apply migrations through the established Supabase workflow before or as part of
the deploy. Never make undocumented manual production database changes.

## Rollback

- Vercel: promote the previous deployment.
- Database: apply a corrective migration (prefer forward fixes over destructive
  rollbacks; see rule 40).
