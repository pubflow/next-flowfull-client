# Next Flowfull Client

Universal Next.js starter for Flowless/Pubflow frontends. It ships with branded auth, login-time 2FA through `@pubflow/react`, a protected dashboard, light/dark mode, English/Spanish UI, and optional Cloudflare deployment through OpenNext.

## Features

- `@pubflow/react` provider and auth forms wired for Flowless login, 2FA, account creation, and password recovery.
- Protected `/dashboard` with `useAuth()` user data surfaced for future modules.
- Environment-based branding: app name, logo, colors, theme, language, API paths.
- Bridge requests can send `X-Bridge-Secret` directly from public env config.
- Portable deploy: standard Next.js for Node/self-host/Vercel, optional OpenNext Cloudflare scripts, plus a Deno Deploy path.

## Quick Start

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`.

## Core Environment

Use `NEXT_PUBLIC_*` only for values that can be exposed to the browser.

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8787
NEXT_PUBLIC_BRIDGE_BASE_PATH=/bridge
NEXT_PUBLIC_AUTH_BASE_PATH=/auth
NEXT_PUBLIC_APP_NAME=Flowfull Client
NEXT_PUBLIC_APP_LOGO=
NEXT_PUBLIC_PRIMARY_COLOR=#006aff
NEXT_PUBLIC_SECONDARY_COLOR=#4a90e2
NEXT_PUBLIC_DEFAULT_THEME=system
NEXT_PUBLIC_DEFAULT_LANGUAGE=en
NEXT_PUBLIC_ENABLE_ACCOUNT_CREATION=true
NEXT_PUBLIC_ENABLE_PASSWORD_RESET=true
```

```env
NEXT_PUBLIC_BRIDGE_SECRET=your_bridge_secret
```

## Scripts

```bash
npm run dev         # Next development server
npm run build       # Standard Next production build
npm run start       # Start standard Next production server
npm run typecheck   # TypeScript verification
npm run lint        # ESLint
npm run build:cf    # OpenNext Cloudflare build
npm run preview:cf  # Cloudflare local preview
npm run deploy:cf   # Cloudflare deploy
npm run build:deno  # Deno Deploy build check
```

Cloudflare/OpenNext builds should use the normal npm or Bun install layout. If Windows reports `EPERM` while creating symlinks under `node_modules\.deno`, rebuild from a clean npm/Bun install, enable Developer Mode/elevated symlinks, or run the Cloudflare build in WSL/Linux. The Deno deploy path remains separate via `npm run build:deno`.

## Home welcome screen

`/` always shows the home welcome (`src/components/home-welcome.tsx`). Edit copy in `src/locales/*/common.json` under `home.welcome`. Login and dashboard stay available via CTAs; protected routes still require auth.

When embedded in Pubflow's Nodepod iframe, runtime helpers (`previewAwareHref`, `isEmbeddedPreviewRuntime`) keep navigations under `/__preview__/pod…` so absolute `/login` links do not escape into the host console.

### Applying starter fixes to an existing OctoBox workspace

Starter changes (for example `src/app/page.tsx`, `src/app/globals.css`, `src/styles/shadcn-tailwind.css`, `src/lib/pubflow-config.ts`, `src/components/auth-guard.tsx`, `src/components/providers.tsx`, `src/app/layout.tsx`) do **not** reach a live workspace until you:

1. **Reset the workspace** from the agent console (recommended after a starter upgrade), or
2. **Save/sync** the updated files into the workspace file tree.

After updating `pubflow-flowfull-client` (Nodepod runtime), **redeploy** `platform.pubflow.com` so the slim install manifest keeps `@tailwindcss/postcss` and preview env restart logic stay active.

If preview styling looks broken (serif headings, unstyled buttons), hard-refresh once, reset/sync the workspace so `globals.css` and `package.json` pick up vendored shadcn CSS + Tailwind deps, then reopen preview.

Then hard-refresh the console once (Service Worker at `/__sw__.js`) and reopen the workspace preview.

Nodepod runs in the Pubflow console, not inside this starter. If you intentionally embed Nodepod in this Next app later, install `@scelar/nodepod` and add:

```ts
// src/app/__sw__.js/route.ts
export { GET } from '@scelar/nodepod/next';
```

## Routes

- `/` always shows the home welcome screen; use the CTAs for `/login` and `/dashboard`.
- `/login` uses `@pubflow/react` `LoginForm`; OTP appears automatically when Flowless returns `requires2fa`.
- `/register` uses `AccountCreationForm`; the login link is controlled by `NEXT_PUBLIC_ENABLE_ACCOUNT_CREATION`.
- `/forgot-password` and `/reset-password` use `PasswordResetForm`; the login link is controlled by `NEXT_PUBLIC_ENABLE_PASSWORD_RESET`.
- `/dashboard` is protected and shows session/config/user payload.
- Bridge calls made through `@pubflow/react` can include `X-Bridge-Secret` from `NEXT_PUBLIC_BRIDGE_SECRET`.

More details live in `docs/`.
