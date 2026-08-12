# Business Software Factory — Master Starter

A reusable base for building professional software for small and medium
businesses (gyms, restaurants, salons, clinics, shops, coaching centres, and
other local service businesses).

## Purpose

Ship customer products fast by reusing a proven, secure, consistent base instead
of rebuilding common functionality per customer. This repository contains only
**genuinely reusable** functionality — customer-specific features live in the
individual customer project derived from this starter.

## Engineering rules

All engineering rules live in [`CLAUDE.md`](./CLAUDE.md). Read it first.

## Stack

Next.js · TypeScript · Tailwind CSS · shadcn/ui · Supabase (Auth, Postgres,
Storage) · Zod · React Hook Form · Lucide · Vitest · Playwright · Vercel.

## Structure

```text
software-factory/
├── CLAUDE.md              # master engineering rules
├── README.md
├── docs/                  # project documentation
│   ├── PROJECT.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE.md
│   ├── UI.md
│   ├── SECURITY.md
│   ├── DEVELOPMENT.md
│   ├── DEPLOYMENT.md
│   └── decisions/         # architecture decision records
├── tasks/                 # task-first development (TEMPLATE.md)
└── src/
    ├── app/               # Next.js routes & layouts
    ├── components/
    │   ├── ui/            # shadcn/ui primitives
    │   └── shared/        # composed reusable components
    ├── features/
    │   ├── auth/          # authentication (reusable)
    │   └── dashboard/     # dashboard layout (reusable)
    ├── lib/               # supabase client, utils, business rules
    ├── hooks/
    ├── types/
    └── config/
```

## Getting started

See [`docs/DEVELOPMENT.md`](./docs/DEVELOPMENT.md).

> Note: this repository currently provides the **structure and documentation**
> of the starter. The Next.js application (package.json, tooling, and code) is
> scaffolded on top of this structure when the app is initialized.
