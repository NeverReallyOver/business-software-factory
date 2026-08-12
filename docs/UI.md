# UI.md

## Principles

UI must be professional, responsive, consistent, accessible, simple, and
business-focused. Prioritize usability over decoration.

Avoid excessive shadows, gradients, animations, rounded containers, and
decorative effects. Do not add visual effects merely because they look
impressive.

## Component system

- **`components/ui/`** — shadcn/ui primitives: Button, Input, Select, Dialog,
  Drawer, Table, Card, Toast, etc. Do not fork or duplicate these.
- **`components/shared/`** — composed reusable pieces: DataTable, Pagination,
  SearchBar, Filter, StatsCard, ConfirmDialog, EmptyState, LoadingState,
  ErrorState, Form wrappers.
- **Feature components** live inside their feature under `src/features/`.

Before creating a component, search for an existing one and reuse/extend it.
Never create `Button2.tsx` / `CustomButton.tsx` when a Button exists.

## Required UI states

Every data-driven view must handle:

- **Loading** — skeleton or spinner
- **Empty** — a helpful message and next action (e.g. "No members yet. Add your
  first member to start managing memberships.")
- **Error** — understandable message, no internal technical detail
- **Success** — the data / confirmation

## Responsive

Support desktop, tablet, and mobile. Admin dashboards must stay usable on small
screens. Do not build desktop-only layouts unless the task requires it.

## Accessibility

Semantic HTML: real buttons and links, labelled form fields, working keyboard
navigation, visible focus states, meaningful alt text, and color that is never
the only indicator.

## Icons

Use Lucide. Do not hand-roll SVGs unnecessarily, and do not use emoji as UI
icons unless explicitly requested.
