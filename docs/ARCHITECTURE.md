# ARCHITECTURE.md

## Stack

- **Framework:** Next.js (App Router) + TypeScript (strict)
- **Styling:** Tailwind CSS + shadcn/ui
- **Platform:** Supabase (Auth, Postgres, Storage)
- **Validation:** Zod
- **Forms:** React Hook Form
- **Icons:** Lucide

## Organizing principle: feature-oriented

Code is grouped by feature, not by technical layer. A feature owns its
components, hooks, server actions, and types.

```text
src/
├── app/                 # Next.js routes, layouts, server components
├── components/
│   ├── ui/              # shadcn/ui primitives (Button, Input, Dialog, ...)
│   └── shared/          # composed reusable components (DataTable, EmptyState, ...)
├── features/
│   ├── auth/            # authentication (reusable)
│   ├── dashboard/       # dashboard layout & widgets (reusable)
│   └── <feature>/       # customer-specific features
├── lib/                 # supabase client, utils, shared business rules
├── hooks/               # cross-feature React hooks
├── types/               # shared + generated database types
└── config/              # app config, constants, navigation
```

## Layering rules

- **Server-first.** Prefer Next.js server components and server actions for data
  access. Reach for client components only when interactivity requires it.
- **Data access** goes through the Supabase client in `lib/`, never scattered
  ad-hoc across components.
- **Business rules** are centralized (e.g. `lib/` domain helpers), not
  duplicated across pages.
- **Shared UI** lives in `components/`; feature-specific UI lives in the feature.

## State management (in order of preference)

1. React state
2. Server-side data handling
3. Supabase
4. Zustand (only when genuinely necessary)
5. TanStack Query (only when its server-state caching is actually useful)

Redux is not used by default.

## Decisions

Meaningful architectural choices are recorded in `docs/decisions/`.
