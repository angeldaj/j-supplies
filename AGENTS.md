# Repository Guidelines

## Project Structure & Module Organization
This project is a Next.js 15 + React 19 storefront/admin app written in TypeScript. Route files live under `app/`, with customer-facing pages in `app/(store)/` and admin views in `app/admin/`. Shared UI is split by domain in `components/store/`, `components/admin/`, `components/layout/`, `components/shared/`, and `components/ui/`. Utility and data modules live in `lib/`, authentication types and handlers are in `lib/auth.ts`, `types/`, and `pages/api/auth/[...nextauth].ts`. Database schema, migrations, and seed data live in `prisma/`. Design notes belong in `docs/plans/`.

## Build, Test, and Development Commands
- `npm run dev`: start the local Next.js dev server.
- `npm run build`: create a production build and catch type/app-router build issues.
- `npm run start`: run the production build locally after `build`.
- `npm run lint`: run Next.js ESLint checks.
- `npm run prisma:generate`: regenerate the Prisma client after schema changes.
- `npm run prisma:migrate -- --name <change>`: create and apply a development migration.
- `npm run prisma:seed`: populate local sample data from `prisma/seed.ts`.

## Coding Style & Naming Conventions
Use TypeScript, functional React components, and existing path aliases like `@/components/...`. The current codebase uses double quotes, semicolons, and 2-space indentation in Prisma files / 2-space visual indentation via formatter in TSX; keep formatting consistent with the file you are editing. Use `PascalCase` for components, `camelCase` for variables/functions, and kebab-free route segment names such as `products/[slug]`. Prefer small presentational components in `components/` and keep route files focused on composition.

## Testing Guidelines
There is no dedicated test suite configured yet. Until one is added, treat `npm run lint` and `npm run build` as the minimum verification for every change. For data-model changes, also run `npm run prisma:generate` and the relevant migration/seed command. When adding tests later, place them near the feature or in a top-level `tests/` directory and use `*.test.ts(x)` naming.

## Commit & Pull Request Guidelines
Git history is currently sparse (`first commit`, `Add UI redesign design doc ...`), so use short imperative commit subjects such as `Add admin inventory filters`. Keep commits focused on one concern. PRs should include a concise summary, linked issue or design doc when applicable, screenshots for UI work, and the validation steps you ran (`lint`, `build`, Prisma commands).

## Security & Configuration Tips
Keep secrets in `.env` files only; never commit database or auth credentials. Schema changes require checking `prisma/schema.prisma` and generated migrations together. If you touch authentication or seeded data, review `lib/auth.ts`, `pages/api/auth/[...nextauth].ts`, and `prisma/seed.ts` as one workflow.
