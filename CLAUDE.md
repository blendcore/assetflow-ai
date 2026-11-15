# AssetFlow AI — Project Architecture & Coding Standards

## 1. Tech Stack

- **Framework:** Next.js 16 (App Router, React Server Components, Server Actions)
- **Language:** TypeScript (`strict: true`, `noUncheckedIndexedAccess: true`). Using `any` is strictly prohibited.
- **UI & Styling:** Tailwind CSS, Shadcn/ui (**Radix UI** primitives — use `asChild` prop where needed), Lucide Icons.
- **Database:** PostgreSQL + Drizzle ORM (`src/db/schema.ts`).
- **Auth & RBAC:** Better-Auth. User roles: `admin`, `operator`, `viewer`.
- **URL State:** `nuqs` (for table pagination, search queries, and filters).
- **Forms & Validation:** React Hook Form + Zod + Sonner (toast notifications).
- **AI Integration:** Vercel AI SDK (`generateObject`, `streamText`, `useChat`, Tool Calling).
- **Testing:** Playwright (E2E).

## 2. Directory Structure (`src/`)

- `src/app/` — App Router routes, `layout.tsx`, `loading.tsx`, `error.tsx`
- `src/components/ui/` — Base Shadcn/ui components
- `src/components/layout/` — App shell components (sidebar, header, AI chat panel)
- `src/components/features/` — Domain components (assets table, forms, staging area)
- `src/db/` — Database client (`index.ts`), schema (`schema.ts`), `seed.ts`
- `src/actions/` — Server Actions grouped by entity
- `src/schemas/` — Shared Zod schemas for client, server, and AI structured outputs
- `src/lib/` — Utilities, RBAC authorization helpers, `.env` validation

## 3. Core Engineering & Security Rules

1. **English Only:** All UI copy, validation errors, toast messages, code comments, and documentation must be written strictly in English.
2. **Server-First:** All components are React Server Components by default. Add `"use client"` only for interactive leaves (forms, data tables, chat).
3. **Mutations & RBAC:** All database writes must go through Server Actions. Every action must:
   - verify the active user session;
   - block any mutation (`create`, `update`, `delete`) for the `viewer` role;
   - validate input payloads with Zod;
   - insert a corresponding record into `audit_logs` within the same transaction.
4. **AI Safety (Human-in-the-loop):** The AI assistant must never mutate database records directly without explicit user confirmation via the UI (Staging Area or interactive confirmation card in chat).
5. **Naming Conventions:** Use `kebab-case.tsx` for file names and `PascalCase` named exports for React components.
6. **Git:** Follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`).

## 4. Commands

- `npm run dev` — Start development server
- `npm run build` — Run type-checking and production build
- `npm run format` — Format codebase with Prettier
