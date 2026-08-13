# TASK-002 — Dashboard layout & navigation shell

## Objective

Provide the reusable authenticated app shell — responsive sidebar navigation,
a header with the current user and sign-out, and a protected `(app)` layout —
that every dashboard page renders inside.

## Context

Builds on TASK-001 (auth). Replaces the placeholder `/dashboard` page.
Customer features (members, payments, ...) will live as pages inside this shell.
Relevant docs: `docs/UI.md`, `docs/ARCHITECTURE.md`.

## Requirements

- Navigation defined once in `src/config/navigation.ts` so projects extend it.
- Responsive shell: persistent sidebar on desktop; a toggleable drawer on mobile.
- Active navigation item is visually indicated (current route).
- Header shows the signed-in user (email + role) and a working sign-out.
- `(app)` layout enforces auth server-side (`requireUser`) as defense in depth
  beyond middleware, and passes the profile to the shell.
- Keep it customer-agnostic and reuse existing UI primitives and design tokens.

## Constraints

- Use existing `components/ui` primitives, `cn`, Lucide icons, and the `sidebar`
  design tokens. Do not add new dependencies.
- Do not build unrelated shared components (DataTable, etc.) — that is TASK-003.
- Feature-shell components live under `src/features/dashboard/`.

## Acceptance Criteria

- [ ] Sidebar + header render; layout is usable on mobile (drawer) and desktop
- [ ] Active route is highlighted
- [ ] Sign-out works from the header
- [ ] Unauthenticated access still redirects to `/login`
- [ ] Typecheck passes
- [ ] Lint passes
- [ ] Tests pass
