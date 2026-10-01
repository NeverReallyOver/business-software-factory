# Business Software Factory

A reusable, production-style **Next.js + Supabase starter** for building
business software for small and medium businesses (gyms, restaurants, salons,
clinics, shops, coaching centres).

Every customer app needs the same foundation: sign-up and login, roles, user
management, settings, an audit trail and a consistent dashboard UI. This repo
builds that foundation once, properly, so each new customer project starts from
a secure, tested base and only adds its own business features.

## Features

| Area | What's included |
| --- | --- |
| **Authentication** | Sign up, login, forgot / reset password, email-confirmation callback, protected routes via `middleware.ts` |
| **Roles & permissions** | `owner`, `admin`, `staff`, `employee`, `customer`; route- and action-level checks (e.g. an admin cannot promote someone to owner) |
| **User management** | User list, role changes, invite users by email through the Supabase admin API (server-only) |
| **Account** | Self-service profile settings and email change with confirmation |
| **Workspace settings** | Owner-managed application settings |
| **Audit log** | Privileged actions are recorded and viewable by owners/admins |
| **UI system** | Responsive app shell and navigation, toast notifications, data table, confirm dialog, empty / loading / error states, 404 and error pages |
| **Database** | Versioned SQL migrations with Row Level Security policies on every table |

## Tech stack

**Next.js 16** (App Router) · **React 19** · **TypeScript** · **Tailwind CSS v4** ·
**shadcn/ui** · **Supabase** (Auth, Postgres, Storage, `@supabase/ssr`) ·
**Zod** · **React Hook Form** · **Vitest** · **Vercel**

## Architecture

Feature-based structure: each feature owns its components, server actions,
schemas and permission rules, and shared building blocks live in
`components/`.

```text
src/
├── app/
│   ├── (auth)/          # login, signup, forgot-password, reset-password
│   ├── (app)/           # dashboard, users, account, settings, audit
│   └── auth/callback/   # Supabase auth callback
├── features/            # auth · users · account · settings · audit · dashboard
├── components/
│   ├── ui/              # shadcn/ui primitives
│   └── shared/          # data table, page header, stats card, states…
├── lib/supabase/        # browser, server and admin clients
├── hooks/  types/  config/
supabase/migrations/     # 0001_profiles … 0005_audit_logs (with RLS)
docs/                    # architecture, database, security, UI, ADRs
tasks/                   # one spec per delivered feature (TASK-001 … TASK-011)
```

Key decisions are recorded as ADRs in [`docs/decisions`](docs/decisions):
using Supabase, feature-based architecture, and the authentication strategy.

## Engineering practices

- **Task-first development.** Every feature starts as a written spec in
  [`tasks/`](tasks) with acceptance criteria, then ships as one focused commit.
- **Security by default.** RLS on all tables, Zod validation on every input,
  service-role key used only on the server, and audit logging for privileged
  actions. See [`docs/SECURITY.md`](docs/SECURITY.md).
- **Documented rules.** Coding, UI and data rules live in
  [`docs/ENGINEERING_RULES.md`](docs/ENGINEERING_RULES.md).

## Getting started

```bash
npm install
cp .env.example .env.local   # add your Supabase URL, anon key, service-role key
# apply supabase/migrations/*.sql to your Supabase project
npm run dev
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run test` | Vitest unit tests |

More detail in [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) and
[`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

## Starting a customer project

1. Clone this starter.
2. Point `.env.local` at the customer's own Supabase project.
3. Add customer-specific features under `src/features/`.
4. Track the work through `tasks/` using `tasks/TEMPLATE.md`.

## License

[MIT](LICENSE) © 2026 Janakiraman V
