# Deployment

## Universal Next.js

Use this path for Node self-hosting, Docker, and Vercel.

```bash
npm run build
npm run start
```

On Vercel, set the same `.env.example` variables in Project Settings.

## Cloudflare Workers

Cloudflare support is optional and powered by OpenNext. Use the Node/npm or Bun install layout for this path.

```bash
npm install
npm run build:cf
npm run preview:cf
npm run deploy:cf
```

For local Cloudflare preview, copy `.dev.vars.example` to `.dev.vars` and set the same public `NEXT_PUBLIC_*` values used by the standard Next app.

On Windows, an OpenNext build can fail with `EPERM: operation not permitted, symlink ... node_modules\.deno ...` when the same checkout was prepared through Deno's npm compatibility layer. That error comes from OpenNext copying traced files and trying to create symlinks from Deno's `node_modules/.deno` store into `.open-next`; it is not an app route or Pubflow issue. For Cloudflare builds, use a clean npm/Bun install, enable Windows Developer Mode or run an elevated shell if symlinks are blocked, or run the Cloudflare build in WSL/Linux.

## Deno Deploy

Deno Deploy supports Next.js apps and builds them in standalone mode. This starter includes `deno.json` runtime configuration and package scripts for Deno checks.

```bash
npm install
npm run build:deno
```

Suggested deploy settings:

- Framework preset: Next.js
- Install command: `deno install --allow-scripts`
- Build command: `npm run build:deno`
- Direct Deno build command: `deno run -A npm:next build --webpack`
- Environment variables: copy the public `NEXT_PUBLIC_*` values from `.env.example`

Cloudflare OpenNext scripts remain the preferred path for Workers deployments; Deno support is additive.
