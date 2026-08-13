# TASK-003 — Shared components

## Objective

Provide the reusable composed components that feature pages depend on: page
header, stat card, the standard Loading / Empty / Error states, a generic
DataTable, and a ConfirmDialog for destructive actions.

## Context

Builds on TASK-001/002. These live in `components/shared/` (composed) and a few
new primitives in `components/ui/`. Relevant docs: `docs/UI.md`.
Every data-driven view must handle loading/empty/error/success (UI.md).

## Requirements

- UI primitives (no new dependencies): `table` (native), `alert-dialog`
  (base-ui, already installed), `spinner` (Lucide).
- Shared: `PageHeader`, `StatsCard`, `LoadingState`, `EmptyState`, `ErrorState`,
  `DataTable` (generic columns + rows, integrates loading/empty), `ConfirmDialog`
  (controlled, destructive variant, loading state, no duplicate confirm).
- Accessible and responsive; reuse `cn`, design tokens, and Lucide icons.

## Constraints

- Do not add dependencies. Do not fork existing `ui` primitives.
- Build only the foundational set; Pagination/SearchBar/Filter are deferred
  until a feature needs them (avoid premature building).
- Keep components presentational and customer-agnostic.

## Acceptance Criteria

- [ ] Components render and are typed generically where relevant (DataTable)
- [ ] DataTable shows loading and empty states
- [ ] ConfirmDialog confirms/cancels and disables while pending
- [ ] Typecheck passes
- [ ] Lint passes
- [ ] Tests pass; production build succeeds
