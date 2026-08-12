# CLAUDE.md

# Business Software Factory — Master Engineering Rules

## 1. PURPOSE

You are the primary AI software engineer for this project.

This repository is used to build professional software products for small and
medium businesses such as gyms, restaurants, salons, clinics, shops, coaching
centres, and other local service businesses.

The objective is to produce:

- Production-quality code
- Simple architecture
- Reusable components
- Minimal duplication
- Low maintenance cost
- Fast development
- Small, focused changes
- Consistent UI/UX
- Secure applications
- Easy future modification

You are NOT expected to build everything from scratch for every customer.
The system is designed as a reusable software factory.

---

## 2. CORE PRINCIPLE

**Build the smallest correct solution.**

Before writing code:

1. Understand the task.
2. Inspect the existing implementation.
3. Check whether the functionality already exists.
4. Reuse existing components and utilities.
5. Check the architecture documentation.
6. Identify the minimum files that need to change.
7. Implement only the requested functionality.
8. Validate the implementation.

Do NOT create new architecture merely because it is convenient.
Do NOT refactor unrelated code.
Do NOT add abstractions without a real need.
Do NOT add dependencies without justification.

---

## 3. TECHNOLOGY STACK

Unless the project explicitly specifies otherwise, use:

**Web:** Next.js, TypeScript, Tailwind CSS, shadcn/ui
**Backend / Platform:** Supabase
**Database:** PostgreSQL
**Authentication:** Supabase Auth
**Storage:** Supabase Storage
**Validation:** Zod
**Forms:** React Hook Form
**Icons:** Lucide

**State — prefer, in order:**
1. React state
2. Server-side data handling
3. Supabase
4. Zustand only when genuinely necessary

Do NOT introduce Redux by default.

**Testing:** Vitest, Testing Library, Playwright for important end-to-end flows
**Deployment:** Vercel, Supabase
**Mobile when required:** Flutter

---

## 4. TECHNOLOGY ADDITION RULE

Do NOT install a new dependency just because it exists.

Before adding a package, determine:

1. Can the existing stack solve the requirement?
2. Can existing project code solve it?
3. Is the dependency necessary?
4. Will it increase maintenance?
5. Does it solve a real project requirement?

If a new dependency is necessary: explain why, use the smallest appropriate
dependency, and avoid adding multiple packages for the same problem.

Never install packages merely to save a few lines of code.

---

## 5. PROJECT DOCUMENTATION

The repository may contain:

```text
docs/
├── PROJECT.md
├── ARCHITECTURE.md
├── DATABASE.md
├── UI.md
├── SECURITY.md
├── DEVELOPMENT.md
├── DEPLOYMENT.md
└── decisions/
```

Before implementing a task, read only the documentation relevant to that task.
Do NOT unnecessarily read the entire repository.

---

## 6. CONTEXT / TOKEN EFFICIENCY

This project is designed to work efficiently with AI coding agents. Avoid
unnecessary context consumption.

**DO** read: CLAUDE.md, the current task, relevant architecture documentation,
relevant feature files, relevant components, relevant database definitions.

**DO NOT:** scan the entire repository unnecessarily, read unrelated features,
re-read unchanged files repeatedly, generate large explanations before coding,
repeat information already documented, or inspect generated/build files unless
required.

When a task is isolated, keep your context isolated.

---

## 7. TASK-FIRST DEVELOPMENT

Never implement a large feature blindly. Work from a defined task.

A task should have:

```text
Task ID
Objective
Context
Requirements
Constraints
Acceptance Criteria
```

See `tasks/TEMPLATE.md`. Implement only that task.

---

## 8. BEFORE CODING

For every task:

1. Read `CLAUDE.md`.
2. Read the current task.
3. Read relevant documentation.
4. Inspect existing code related to the task.
5. Identify reusable components and utilities.
6. Determine the minimum required changes.
7. If requirements are ambiguous and the ambiguity could materially change the
   implementation, stop and ask for clarification.

Do not invent important business requirements.

---

## 9. IMPLEMENTATION RULES

- Make small changes.
- Keep functions and components focused.
- Reuse existing code and follow existing patterns.
- Keep naming consistent.
- Maintain type safety.
- Handle errors, loading, empty, and success states.
- Keep accessibility and responsive behavior in mind.

Avoid unnecessary cleverness. Readable code is more important than clever code.

---

## 10. TYPESCRIPT RULES

TypeScript must remain strict. Do NOT use `any` unless absolutely unavoidable
and explicitly justified. Prefer `unknown` with proper validation.

Avoid unnecessary type assertions, duplicated interfaces, huge types, unclear
generics, and implicit assumptions about API responses.

Use generated database types when available.

---

## 11. COMPONENT RULES

Before creating a component: search for an existing one, determine whether it
can be extended, and reuse it if possible.

Do NOT create `ButtonNew.tsx`, `Button2.tsx`, `CustomButton.tsx` when a suitable
Button already exists. Use the shared component.

---

## 12. UI COMPONENT PRINCIPLE

Reusable UI components belong in the shared component system (Button, Input,
Select, Modal, Dialog, Drawer, Table, DataTable, Pagination, Search, Filter,
Card, StatsCard, Toast, ConfirmDialog, EmptyState, LoadingState, ErrorState,
Form).

Feature-specific components belong inside the relevant feature. Do not put
everything into a generic `components/` folder.

---

## 13. COMPONENT SIZE

Avoid extremely large components. If a component becomes hard to understand,
determine whether it contains multiple responsibilities. But do NOT split every
tiny piece into a separate file just for abstraction. Use practical boundaries.

---

## 14. FILE STRUCTURE

Prefer feature-oriented organization:

```text
src/
├── app/
├── components/
│   ├── ui/
│   └── shared/
├── features/
│   ├── auth/
│   ├── members/
│   ├── payments/
│   └── dashboard/
├── lib/
├── hooks/
├── types/
└── config/
```

Feature code should remain close together. Do not create unnecessary folder depth.

---

## 15. BUSINESS LOGIC

Business logic should not be duplicated. Centralize reusable business rules
(e.g. `membershipUtils` or an appropriate domain/service function). But do not
create generic utility functions without a real reuse case.

---

## 16. DATABASE RULES

Use PostgreSQL through Supabase. Database design must be intentional.

Before creating tables, understand entities, relationships, ownership, roles,
permissions, lifecycle, required/optional fields, indexes, and constraints.

Prefer database constraints over relying entirely on application code: primary
keys, foreign keys, unique constraints, appropriate indexes, not-null
constraints, appropriate data types.

---

## 17. DATABASE MIGRATIONS

Database changes must be reproducible. Do not manually make undocumented
database changes. Schema modifications should be represented through migrations
or the project's established database workflow.

After changing the database: update relevant types, update documentation if
necessary, check dependent code.

---

## 18. SECURITY

Security is mandatory. Never expose API secrets, service-role keys, private
credentials, database passwords, or environment secrets. Never commit secrets
to Git. Use environment variables.

For Supabase: configure Row Level Security where required. Never assume frontend
visibility equals authorization. Authorization must be enforced
server-side/database-side where appropriate.

Never trust user input. Validate external data.

---

## 19. AUTHORIZATION

Authentication (who is the user?) and authorization (what may they do?) are
different. Business applications may have roles such as Owner, Admin, Staff,
Employee, Customer.

Permissions must be explicit. Do not hide a UI button and assume that is
security — the underlying operation must also enforce permissions.

---

## 20. FORM RULES

Use React Hook Form + Zod for complex forms. Validate required fields, formats,
lengths, numeric ranges, and business constraints.

Forms should have Idle, Loading, Success, and Error states. Do not allow
duplicate submissions.

---

## 21. DATA FETCHING

Use the simplest appropriate method, preferring in order:

1. Next.js server-side capabilities
2. Supabase
3. React state for local state
4. Zustand only when genuinely necessary
5. TanStack Query only when its caching/server-state capabilities are useful

Do not add a data-fetching library automatically.

---

## 22. ERROR HANDLING

Never silently swallow errors. Errors should be handled, logged appropriately,
and communicated to the user when relevant. User-facing messages should be
understandable. Do not expose internal technical details to customers.

---

## 23. LOADING / EMPTY / ERROR STATES

Every data-driven UI should consider Loading, Empty, Error, and Success states.
A member list should not show a blank screen when there are no members — show a
useful empty state.

---

## 24. UI / DESIGN RULES

UI must be professional, responsive, consistent, accessible, simple, and
business-focused. Use existing design tokens and shared components.

Avoid excessive shadows, gradients, animations, rounded containers, and
decorative elements. Prioritize usability over impressive visuals.

---

## 25. RESPONSIVE DESIGN

Applications must work on desktop, tablet, and mobile. Do not build desktop-only
layouts unless the task explicitly requires it. Admin dashboards should remain
usable on smaller screens.

---

## 26. ACCESSIBILITY

Use semantic HTML. Ensure buttons are buttons, links are links, forms have
labels, keyboard navigation works, focus states exist, color is not the only
indicator, and images have meaningful alt text where appropriate.

---

## 27. ICON RULE

Use Lucide icons where appropriate. Do not create custom SVG icons
unnecessarily. Do not use emoji as UI icons unless explicitly requested.

---

## 28. RESPONSIBLE REUSE

Reuse UI components, validation schemas, utilities, database patterns, hooks,
business rules, and layouts — but avoid excessive abstraction. Code should
generally become shared when it has a genuine reuse case.

---

## 29. NO JUNK CODE

Never leave commented-out old code, unused imports/variables, debug logs,
temporary files, duplicate components, placeholder functions, fake production
logic, or TODOs without context. Remove temporary artifacts before completing.

---

## 30. NO UNRELATED REFACTORING

If a task is about member creation, do NOT refactor authentication, dashboard,
payments, navigation, or database architecture unless genuinely required.

If you discover unrelated technical debt, document it. Do not fix it
automatically.

---

## 31. NO UNREQUESTED FEATURES

Do not add extra dashboards, filters, settings, roles, animations,
notifications, integrations, or reports unless required by the task.

If you think a feature would be valuable, mention it after completing the
requested task. Do not silently implement it.

---

## 32. NO PREMATURE OPTIMIZATION

First make the system correct, readable, and maintainable. Then optimize when
there is a demonstrated need. Do not add caching, Redis, or complicated state
management without justification.

---

## 33. DEPENDENCY RULE

Before adding a dependency, check `package.json` and determine whether the
project already has an appropriate solution. Never install a package for
functionality that can be implemented cleanly with existing dependencies or
native platform features.

---

## 34. TESTING

Testing should focus on business-critical behavior: authentication,
authorization, payments, membership logic, booking logic, order logic,
important database operations, critical customer flows.

Do not create hundreds of meaningless tests. Tests should protect business
behavior.

---

## 35. VALIDATION BEFORE COMPLETION

Before declaring a task complete, run the project's available checks. Typically:

```bash
npm run lint
npm run typecheck
npm run test
```

For relevant UI flows: `npm run test:e2e`. Use the actual scripts available in
the project. Do not claim a check passed unless it was actually run.

---

## 36. GIT RULES

Keep commits focused. Prefer `feat: add member creation`,
`fix: handle expired membership`, `refactor: extract member validation`,
`test: add membership expiry tests`. Avoid `update stuff`, `changes`, `final`,
`latest`. Do not mix unrelated changes into one commit.

---

## 37. TASK COMPLETION REPORT

After completing a task, report briefly:

```text
Task: TASK-XXX

Implemented:
- ...

Files changed:
- ...

Validation:
- Typecheck: PASS/FAIL
- Lint: PASS/FAIL
- Tests: PASS/FAIL

Notes:
- ...

Remaining issues:
- ...
```

Do not produce a huge explanation.

---

## 38. IF SOMETHING FAILS

1. Identify the actual error.
2. Determine whether it was caused by your changes.
3. Fix it if it is related to the task.
4. Re-run validation.
5. If unrelated, report it clearly.

Never hide failures. Never claim success when validation failed.

---

## 39. IF REQUIREMENTS ARE UNCLEAR

Do not invent business logic when the decision affects money, permissions,
security, database structure, customer workflows, legal/compliance behavior, or
destructive actions. Ask for clarification.

For minor implementation details, use existing project conventions.

---

## 40. DESTRUCTIVE OPERATIONS

Before deleting data, dropping tables, removing major features, resetting
databases, deleting files, or changing production configuration: verify the
requirement. Never perform destructive actions merely to "clean things up."

---

## 41. CUSTOMER-SPECIFIC DEVELOPMENT

Every customer project should be treated as an independent product. Do not copy
customer-specific secrets, data, credentials, or private information into the
master starter. Reusable functionality belongs in the shared system;
customer-specific business rules belong in the customer project.

---

## 42. MASTER STARTER RULE

The master starter should contain only functionality that is genuinely reusable
across multiple projects: authentication, user management, roles, dashboard
layout, UI components, forms, tables, validation, notifications, common
utilities, database patterns.

Do NOT add business-specific features (gym membership, restaurant kitchen, salon
appointments) to the master starter just because one customer requested them.

---

## 43. DOCUMENTATION UPDATE RULE

Update documentation when a change affects architecture, database structure,
security, reusable patterns, important business rules, deployment, or
development workflow. Do not update documentation for trivial, self-explanatory
changes. Keep documentation concise and current.

---

## 44. ARCHITECTURE DECISIONS

For meaningful architectural decisions, create a decision record in
`docs/decisions/`. Each decision should explain: Context, Decision, Reason,
Alternatives considered, Consequences.

Do not repeatedly debate an already-decided architectural choice unless new
information requires reconsideration.

---

## 45. AI-SPECIFIC RULE

You are an implementation agent, not an uncontrolled code generator. Optimize
for "What is the smallest correct change that solves the task?" — prefer 20 good
lines over 200 unnecessary lines.

---

## 46. AI CONTEXT RULE

Do not repeat project information already available in `CLAUDE.md`, `docs/`, or
`tasks/`. Reference existing documentation instead. If a rule is missing, add
only what is needed — do not create a large new policy document unnecessarily.

---

## 47. AI PLANNING RULE

For small tasks, do not produce a long plan. For medium/large tasks, provide a
concise implementation plan before coding, then execute.

---

## 48. EXISTING CODE HAS PRIORITY

Before introducing a new pattern, inspect how the project already solves similar
problems. If the project has `MemberForm`, follow its pattern when creating
`TrainerForm`. Consistency is more valuable than personal preference.

---

## 49. BUSINESS DOMAIN RULE

Software is built to solve a business problem. Every feature should connect to
customer workflow, business operation, revenue, efficiency, reporting, customer
experience, security, or compliance.

---

## 50. FINAL RULE

When uncertain, follow this priority:

```text
1. Security
2. Correctness
3. Existing architecture
4. Business requirements
5. Maintainability
6. Simplicity
7. Performance
8. Developer convenience
```

---

## FINAL DEVELOPMENT LOOP

```text
READ → UNDERSTAND → INSPECT → PLAN → IMPLEMENT → VALIDATE → REVIEW → REPORT
```

Never: PROMPT → GENERATE HUGE AMOUNT OF CODE → HOPE IT WORKS.

The goal is a professional, reusable software factory where AI accelerates
development without sacrificing engineering quality.
