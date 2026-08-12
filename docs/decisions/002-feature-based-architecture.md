# 002. Feature-based architecture

## Context

Customer apps grow feature by feature. Organizing by technical layer
(all components in one folder, all hooks in another) scatters a single feature
across the codebase and makes isolated, low-context changes harder.

## Decision

Organize `src/` by feature. Each feature under `src/features/` owns its
components, hooks, server actions, and types. Only genuinely shared UI and
utilities live in `components/` and `lib/`.

## Reason

- Keeps related code together, enabling small, isolated changes.
- Supports token-efficient AI development (read one feature, not the repo).
- Clarifies the boundary between reusable starter code and customer-specific
  code (see rule 42).

## Alternatives considered

- **Layer-based (type-first) structure** — familiar but spreads a feature across
  many folders. Rejected for maintainability at scale.

## Consequences

- Shared code must earn its place in `components/`/`lib/` (real reuse case).
- Customer-specific features stay in the customer project, not the starter.
