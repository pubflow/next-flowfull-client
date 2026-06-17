# Next Flowfull Client

Universal Next.js starter for Flowless/Pubflow frontends. It ships with branded auth, login-time 2FA through `@pubflow/react`, a protected dashboard, light/dark mode, English/Spanish UI, and optional Cloudflare deployment through OpenNext.

## Features

- `@pubflow/react` provider and auth forms wired for Flowless login, 2FA, account creation, and password recovery.
- Protected `/dashboard` with `useAuth()` user data surfaced for future modules.
- Environment-based branding: app name, logo, colors, theme, language, API paths.
- Bridge requests can send `X-Bridge-Secret` directly from public env config.
- Portable deploy: standard Next.js for Node/self-host/Vercel, optional OpenNext Cloudflare scripts.

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
```

## Routes

- `/` checks auth state and routes to `/dashboard` or `/login`.
- `/login` uses `@pubflow/react` `LoginForm`; OTP appears automatically when Flowless returns `requires2fa`.
- `/register` uses `AccountCreationForm`; the login link is controlled by `NEXT_PUBLIC_ENABLE_ACCOUNT_CREATION`.
- `/forgot-password` and `/reset-password` use `PasswordResetForm`; the login link is controlled by `NEXT_PUBLIC_ENABLE_PASSWORD_RESET`.
- `/dashboard` is protected and shows session/config/user payload.
- Bridge calls made through `@pubflow/react` can include `X-Bridge-Secret` from `NEXT_PUBLIC_BRIDGE_SECRET`.

More details live in `docs/`.
