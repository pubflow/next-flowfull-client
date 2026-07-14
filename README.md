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
NEXT_PUBLIC_PREVIEW_MODE=false
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

## Coding preview mode

Set `NEXT_PUBLIC_PREVIEW_MODE=true` only inside Pubflow's Coding Agent/browser preview. The home route will show a friendly "Welcome to your Pubflow App" screen with links to login and dashboard. Leave it unset or `false` in production to keep the normal auth redirect.

In the Pubflow console, Nodepod injects preview flags automatically (`NEXT_PUBLIC_PREVIEW_MODE`, `window.__PUBFLOW_PREVIEW__`, and transport paths like `/__preview__/pod…/3000/` or `/preview/pod…`). The starter detects those at runtime so the welcome screen appears even when build-time env has not inlined yet.

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

- `/` shows the preview welcome in Nodepod/coding-agent preview (runtime detection or `NEXT_PUBLIC_PREVIEW_MODE=true`); otherwise it checks auth state and routes to `/dashboard` or `/login`.
- `/login` uses `@pubflow/react` `LoginForm`; OTP appears automatically when Flowless returns `requires2fa`.
- `/register` uses `AccountCreationForm`; the login link is controlled by `NEXT_PUBLIC_ENABLE_ACCOUNT_CREATION`.
- `/forgot-password` and `/reset-password` use `PasswordResetForm`; the login link is controlled by `NEXT_PUBLIC_ENABLE_PASSWORD_RESET`.
- `/dashboard` is protected and shows session/config/user payload.
- Bridge calls made through `@pubflow/react` can include `X-Bridge-Secret` from `NEXT_PUBLIC_BRIDGE_SECRET`.

More details live in `docs/`.
