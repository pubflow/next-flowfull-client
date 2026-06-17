# Deployment

## Universal Next.js

Use this path for Node self-hosting, Docker, and Vercel.

```bash
npm run build
npm run start
```

On Vercel, set the same `.env.example` variables in Project Settings.

## Cloudflare Workers

Cloudflare support is optional and powered by OpenNext.

```bash
npm run build:cf
npm run preview:cf
npm run deploy:cf
```

For local Cloudflare preview, copy `.dev.vars.example` to `.dev.vars` and set the same public `NEXT_PUBLIC_*` values used by the standard Next app.
