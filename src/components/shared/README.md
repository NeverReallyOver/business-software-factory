# components/shared/

Composed, reusable components built on `components/ui/` primitives. Presentational
and customer-agnostic — business logic (fetching, sorting) stays in callers.

- `PageHeader` — page title, description, and an actions slot.
- `StatsCard` — compact metric tile for dashboards.
- `LoadingState` / `EmptyState` / `ErrorState` — the standard data-view states
  required by `docs/UI.md`. `ErrorState` shows a friendly message only (no
  internal detail) with an optional retry.
- `DataTable<T>` — generic table (columns + rows) that integrates the loading
  and empty states. Pass `columns`, `data`, and `getRowKey`.
- `ConfirmDialog` — controlled confirmation for destructive actions
  (`destructive` + `loading` variants). Caller owns `open` and closes after the
  action settles.

Supporting `components/ui/` primitives added for these: `table`, `alert-dialog`
(base-ui), `spinner`.

Deferred until a feature needs them: Pagination, SearchBar, Filter.
