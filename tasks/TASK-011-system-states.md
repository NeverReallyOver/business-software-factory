# TASK-011 — System states (404, error, loading)

## Objective

Give the app proper route-level system states: a branded 404 page, error
boundaries that let users recover, and loading states during navigation.

## Context

Fills a gap: without these, Next.js shows unstyled defaults and unhandled errors
break the page. Reuses the shared state components from TASK-003. Docs: `docs/UI.md`
(every view handles loading/empty/error), `docs/SECURITY.md` (no internal detail
to users), rule 22 (never silently swallow — log server/console-side).

## Requirements

- Global `not-found.tsx` — friendly 404 with a way back home.
- Global `error.tsx` — error boundary with a retry; logs the error (console),
  shows only a friendly message.
- `(app)/error.tsx` — error boundary that keeps the shell (sidebar/header) so a
  failing page doesn't blow away navigation.
- `(app)/loading.tsx` — loading state shown inside the shell during navigation.

## Constraints

- No new dependencies. Reuse `ErrorState`, `EmptyState`, `LoadingState`.
- Error components are client components (Next requirement); never leak stack
  traces or internal detail to the user.

## Acceptance Criteria

- [ ] Unknown routes render the 404 page
- [ ] A thrown error renders the boundary with a working retry
- [ ] The `(app)` boundary keeps the shell; navigation shows the loading state
- [ ] Typecheck / lint / tests pass; build succeeds
