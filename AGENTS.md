<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# bangla-news-24

Bengali news reader built on Next.js App Router. Headlines are fetched from the external API `https://news-api-v2.vercel.app`; MongoDB is only used by Better Auth.

## Commands

- `npm run dev` — dev server on `:3000` (Turbopack is the Next 16 default). It rewrites the block above in this file, so keep that block intact.
- `npm run lint` — ESLint flat config. `next lint` was removed in Next 16.
- `npx tsc --noEmit` — typecheck. There is no `typecheck` script.
- `npm run build` / `npm start`.
- No test runner, CI, or pre-commit hooks are configured; don't invent test commands.

## Next 16 specifics

- Check `node_modules/next/dist/docs/` before using unfamiliar Next APIs; older Next knowledge is unreliable here.
- Dynamic route `params` are Promises: type them `Promise<{ id: string }>` and `await` them (`src/app/news/[newsId]/page.tsx`). `src/app/category/[categoryId]/page.tsx` still uses the old non-Promise type.
- Global generated prop helpers `LayoutProps<"/">`, `PageProps`, and `RouteContext` need no import (see `src/app/layout.tsx`).
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`); don't add `useMemo`/`useCallback` just for optimization.
- `next.config.ts` allows every HTTPS image host. Cards/logo use `next/image`; the article body uses plain `<img>` with an `@next/next/no-img-element` disable because body image URLs are arbitrary.

## Architecture

- `src/app/layout.tsx` wraps every page with Navbar, Marquee, `<main className="max-w-7xl mx-auto">`, and `ToastContainer`. Pages render inside that `main`; don't repeat the chrome.
- Components live in `src/app/components/` (not a route segment). `@/*` maps to `src/*`.
- Fetching happens directly inside async server components (`page.tsx`, `NavLinks`, `MostRead`, `Marquee`) against the external news API. The article page uses `{ next: { revalidate: 300 } }`. There is no local news database, mock, or shared fetch helper — new sections repeat the pattern.
- Auth is Better Auth:
  - `src/lib/auth.ts` — server config, Mongo DB name hardcoded as `bangla-news-24`; email/password + Google + GitHub enabled.
  - `src/app/api/auth/[...all]/route.ts` — the only auth handler. Add providers here via config, not new route files.
  - `src/lib/auth-client.ts` — client exports. Quirk: it creates two clients, and `signIn`/`signUp`/`signOut`/`useSession` come from a second `createAuthClient()` that ignores `baseURL`. Reuse these exports; don't create another client.
  - Client components must import from `@/lib/auth-client`, never `@/lib/auth` (server-only, imports Mongo).

## Environment

`.env` is gitignored, so a fresh clone needs one created. Required keys:

`BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` (e.g. `http://localhost:3000`), `MONGODB_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`.

Auth endpoints throw without `MONGODB_URL`. OAuth sign-in requires the provider callback URL registered (Better Auth default path: `/api/auth/callback/<provider>`).

## Styling and content

- Tailwind v4 + daisyUI 5 via `src/app/globals.css` (`@import "tailwindcss"; @plugin "daisyui";`) and `postcss.config.mjs`. There is no `tailwind.config.*`; don't create one.
- Theme comes from `data-theme="light"` on `<html>` in the root layout.
- UI copy is Bengali; dates/numbers are formatted with `bn-BD` and `Asia/Dhaka`. Keep new user-facing text Bengali and daisyUI class names (`btn`, `card`, `input`, `fieldset`) consistent with existing pages.
- `CLAUDE.md` only contains `@AGENTS.md`; edit `AGENTS.md` and keep it the single source of truth.
