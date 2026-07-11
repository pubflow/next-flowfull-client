function isEnabled(value?: string): boolean {
  return /^(true|1|yes|on)$/i.test(String(value || '').trim().replace(/^['"]|['"]$/g, ''));
}

function parseList(value?: string): string[] {
  return String(value || '')
    .split(',')
    .map(item => item.trim().replace(/^['"]|['"]$/g, '').toLowerCase())
    .filter(Boolean);
}

export const PUBFLOW_CONFIG = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8787',
  BRIDGE_BASE_PATH: process.env.NEXT_PUBLIC_BRIDGE_BASE_PATH || '/bridge',
  AUTH_BASE_PATH: process.env.NEXT_PUBLIC_AUTH_BASE_PATH || '/auth',
  BRIDGE_SECRET: process.env.NEXT_PUBLIC_BRIDGE_SECRET || process.env.NEXT_PUBLIC_BRIDGE_VALIDATION_SECRET || '',
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Flowfull Client',
  APP_LOGO: process.env.NEXT_PUBLIC_APP_LOGO || '',
  PRIMARY_COLOR: process.env.NEXT_PUBLIC_PRIMARY_COLOR || '#006aff',
  SECONDARY_COLOR: process.env.NEXT_PUBLIC_SECONDARY_COLOR || '#4a90e2',
  ACCENT_COLOR: process.env.NEXT_PUBLIC_ACCENT_COLOR || '#06b6d4',
  DEFAULT_THEME: process.env.NEXT_PUBLIC_DEFAULT_THEME || 'system',
  LOGIN_REDIRECT_PATH: process.env.NEXT_PUBLIC_LOGIN_REDIRECT_PATH || '/login',
  PUBLIC_PATHS: process.env.NEXT_PUBLIC_PUBLIC_PATHS || '/login,/register,/forgot-password,/reset-password,/',
  ENABLE_ACCOUNT_CREATION: process.env.NEXT_PUBLIC_ENABLE_ACCOUNT_CREATION !== 'false',
  ENABLE_PASSWORD_RESET: process.env.NEXT_PUBLIC_ENABLE_PASSWORD_RESET !== 'false',
  LOGIN_PROVIDERS: parseList(process.env.NEXT_PUBLIC_LOGIN_PROVIDERS),
  SOCIAL_AUTH_BASE_URL: process.env.NEXT_PUBLIC_SOCIAL_AUTH_BASE_URL || '',
  ENABLE_DEBUG_TOOLS: process.env.NEXT_PUBLIC_ENABLE_DEBUG_TOOLS === 'true',
  SHOW_SESSION_ALERTS: process.env.NEXT_PUBLIC_SHOW_SESSION_ALERTS === 'true',
  ENABLE_PERSISTENT_CACHE: process.env.NEXT_PUBLIC_ENABLE_PERSISTENT_CACHE !== 'false',
  PREVIEW_MODE:
    isEnabled(process.env.NEXT_PUBLIC_PREVIEW_MODE) ||
    isEnabled(process.env.NEXT_PUBLIC_PUBFLOW_WEB_PREVIEW),
  DEFAULT_LANGUAGE: process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE || 'en',
};

export function buildSocialLoginUrl(provider: string, redirectPath = '/dashboard'): string {
  const base = (
    PUBFLOW_CONFIG.SOCIAL_AUTH_BASE_URL ||
    `${PUBFLOW_CONFIG.API_BASE_URL.replace(/\/$/, '')}${PUBFLOW_CONFIG.AUTH_BASE_PATH}/social`
  ).replace(/\/$/, '');

  const url = new URL(`${base}/${encodeURIComponent(provider)}`);
  if (typeof window !== 'undefined') {
    url.searchParams.set('redirect', `${window.location.origin}${redirectPath}`);
  }
  url.searchParams.set('redirect_path', redirectPath);
  return url.toString();
}

export function buildApiUrl(endpoint: string): string {
  const baseUrl = PUBFLOW_CONFIG.API_BASE_URL.replace(/\/$/, '');
  const cleanEndpoint = endpoint.replace(/^\//, '');
  return `${baseUrl}/${cleanEndpoint}`;
}

export function getRedirectUrl(search?: string): string {
  if (!search && typeof window !== 'undefined') {
    search = window.location.search;
  }

  const redirect = new URLSearchParams(search || '').get('redirect');
  return redirect && !isPublicPath(redirect) ? redirect : '/dashboard';
}

export function isPublicPath(pathname: string): boolean {
  const publicPaths = PUBFLOW_CONFIG.PUBLIC_PATHS.split(',')
    .map(path => path.trim())
    .filter(Boolean);

  return publicPaths.some(path => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  });
}
