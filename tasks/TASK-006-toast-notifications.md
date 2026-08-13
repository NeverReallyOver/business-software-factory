# TASK-006 — Toast notifications

## Objective

Provide a reusable toast system for transient action feedback (success/error),
usable from anywhere, and wire it into the existing account and role-change flows.

## Context

Builds on TASK-001–005. Uses the installed `@base-ui/react` Toast (no new
dependency). Complements inline form errors (which stay in-context); toasts are
for confirmations and out-of-band feedback. Relevant docs: `docs/UI.md`.

## Requirements

- A `Toaster` mounted once at the app root, and a small imperative helper
  (`toast.success/error/message`) callable from any client component.
- Accessible, dismissible, auto-timeout, stacked with a sensible limit.
- Wire success feedback into: account profile update, account password change,
  and the user role change. Keep existing inline errors.

## Constraints

- No new dependencies (use base-ui Toast). Reuse `cn`, design tokens, Lucide.
- Keep animation minimal (a fade), per UI.md.
- Toast primitive lives in `components/ui/`.

## Acceptance Criteria

- [ ] Toaster renders app-wide; toasts appear, auto-dismiss, and can be closed
- [ ] Success toasts fire on profile update, password change, role change
- [ ] Typecheck / lint / tests pass; production build succeeds
