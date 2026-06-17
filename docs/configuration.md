# Configuration

The starter mirrors the TanStack Flowfull client but uses `NEXT_PUBLIC_*` for browser-safe configuration.

## Public Variables

- `NEXT_PUBLIC_API_BASE_URL`: Flowless API origin.
- `NEXT_PUBLIC_BRIDGE_BASE_PATH`: Bridge base path, usually `/bridge`.
- `NEXT_PUBLIC_AUTH_BASE_PATH`: Auth base path, usually `/auth`.
- `NEXT_PUBLIC_BRIDGE_SECRET`: Optional value sent as `X-Bridge-Secret`.
- `NEXT_PUBLIC_BRIDGE_VALIDATION_SECRET`: Alternative supported public name for the same header.
- `NEXT_PUBLIC_APP_NAME`: Display name used by login, dashboard, and metadata.
- `NEXT_PUBLIC_APP_LOGO`: Optional logo URL.
- `NEXT_PUBLIC_PRIMARY_COLOR`, `NEXT_PUBLIC_SECONDARY_COLOR`, `NEXT_PUBLIC_ACCENT_COLOR`: UI and Pubflow theme colors.
- `NEXT_PUBLIC_DEFAULT_THEME`: `system`, `light`, or `dark`.
- `NEXT_PUBLIC_DEFAULT_LANGUAGE`: `en` or `es`.
- `NEXT_PUBLIC_PUBLIC_PATHS`: Comma-separated public route prefixes. Defaults to `/login,/register,/forgot-password,/reset-password,/`.
- `NEXT_PUBLIC_ENABLE_ACCOUNT_CREATION`: Shows the account creation link in login unless set to `false`.
- `NEXT_PUBLIC_ENABLE_PASSWORD_RESET`: Shows the password recovery link in login unless set to `false`.
- `NEXT_PUBLIC_ENABLE_DEBUG_TOOLS`: Enables Pubflow debug tools.
- `NEXT_PUBLIC_SHOW_SESSION_ALERTS`: Enables session alert behavior.
- `NEXT_PUBLIC_ENABLE_PERSISTENT_CACHE`: Enables Pubflow persistent cache.

Bridge secret values are intentionally client-visible in this starter. Do not use this pattern if your deployment requires the Bridge secret to remain private.
