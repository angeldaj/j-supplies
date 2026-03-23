# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

J Supplies is a Spanish-language e-commerce platform for recurring personal care supplies (diapers, hygiene, protection, mobility products). It supports both one-time purchases and subscription-based replenishment. The app targets families, caregivers, and institutions.

## Commands

```bash
npm run dev              # Start Next.js dev server
npm run build            # Production build
npm run lint             # ESLint (next/core-web-vitals)
npm run prisma:generate  # Regenerate Prisma client after schema changes
npm run prisma:migrate   # Create and apply a new migration
npm run prisma:seed      # Seed admin user (requires SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in .env)
```

## Architecture

- **Framework**: Next.js 15 (App Router) with React 19, TypeScript strict mode
- **Database**: PostgreSQL via Prisma ORM (`prisma/schema.prisma`)
- **Auth**: NextAuth v4 with credentials provider (JWT strategy), configured in `lib/auth.ts`, route handler in `pages/api/auth/[...nextauth].ts` (Pages Router — this is intentional for NextAuth v4 compatibility)
- **UI**: shadcn/ui (base-nova style) + Tailwind CSS 3 + Lucide icons. Components use `@base-ui/react` render prop pattern for polymorphic elements (e.g., `<Button render={<Link href="..." />}>`)
- **Validation**: Zod
- **Payments**: Stripe (integration planned, env vars defined but not yet wired)

## Route Groups

- `app/(store)/` — Customer-facing storefront pages (home, products, bundles, cart, checkout, account, login)
- `app/admin/` — Admin panel with role-based guard (`ADMIN` role required, redirects otherwise). Sidebar layout with sections for products, categories, bundles, customers, orders, subscriptions, inventory

## Key Patterns

- **Path aliases**: `@/*` maps to project root (e.g., `@/components/ui/button`, `@/lib/prisma`)
- **Prisma singleton**: `lib/prisma.ts` uses global caching to avoid multiple clients in dev
- **Static data layer**: `lib/data/site.ts` holds placeholder product/bundle/category data and admin snapshots used by storefront pages. This is temporary — real pages will query Prisma
- **Session helper**: `getServerAuthSession()` from `lib/auth.ts` for server-side auth checks
- **NextAuth type augmentation**: `types/next-auth.d.ts` extends Session/User/JWT with `role` field
- **Fonts**: Cormorant Garamond (display/serif) and Instrument Sans (body) loaded via `next/font/google`
- **Images**: Remote patterns configured for `images.unsplash.com`

## Language

All user-facing copy, labels, and UI text is in **Spanish**. Code (variables, comments, commits) is in English.
