'use client';

import { PubflowProvider } from '@pubflow/react';
import { I18nextProvider } from 'react-i18next';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { PubflowInstanceConfig } from '@pubflow/core';
import { i18n } from '@/lib/i18n';
import { PUBFLOW_CONFIG } from '@/lib/pubflow-config';

export type ThemeMode = 'light' | 'dark' | 'system';

export function Providers({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return PUBFLOW_CONFIG.DEFAULT_THEME as ThemeMode;
    const stored = window.localStorage.getItem('flowfull-theme') as ThemeMode | null;
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
    return PUBFLOW_CONFIG.DEFAULT_THEME as ThemeMode;
  });

  useEffect(() => {
    const root = document.documentElement;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolved = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;

    root.dataset.theme = resolved;
    root.classList.toggle('dark', resolved === 'dark');
    root.classList.toggle('light', resolved === 'light');
    root.style.setProperty('--brand-primary', PUBFLOW_CONFIG.PRIMARY_COLOR);
    root.style.setProperty('--brand-secondary', PUBFLOW_CONFIG.SECONDARY_COLOR);
    root.style.setProperty('--brand-accent', PUBFLOW_CONFIG.ACCENT_COLOR);
    window.localStorage.setItem('flowfull-theme', theme);
  }, [theme]);

  const themeContext = useMemo(() => ({
    primaryColor: PUBFLOW_CONFIG.PRIMARY_COLOR,
    secondaryColor: PUBFLOW_CONFIG.SECONDARY_COLOR,
    appName: PUBFLOW_CONFIG.APP_NAME,
    logo: PUBFLOW_CONFIG.APP_LOGO,
  }), []);

  const headers = useMemo(() => {
    if (!PUBFLOW_CONFIG.BRIDGE_SECRET) return undefined;
    return { 'X-Bridge-Secret': PUBFLOW_CONFIG.BRIDGE_SECRET };
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <PubflowProvider
        config={{
          id: 'default',
          baseUrl: PUBFLOW_CONFIG.API_BASE_URL,
          bridgeBasePath: PUBFLOW_CONFIG.BRIDGE_BASE_PATH,
          authBasePath: PUBFLOW_CONFIG.AUTH_BASE_PATH,
          headers,
        } as PubflowInstanceConfig}
        loginRedirectPath={PUBFLOW_CONFIG.LOGIN_REDIRECT_PATH}
        enableDebugTools={PUBFLOW_CONFIG.ENABLE_DEBUG_TOOLS}
        showSessionAlerts={PUBFLOW_CONFIG.SHOW_SESSION_ALERTS}
        persistentCache={{ enabled: PUBFLOW_CONFIG.ENABLE_PERSISTENT_CACHE }}
        theme={themeContext}
      >
        <ThemeContext.Provider value={{ theme, setTheme }}>
          {children}
        </ThemeContext.Provider>
      </PubflowProvider>
    </I18nextProvider>
  );
}

const ThemeContext = createContext<{
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}>({
  theme: 'system',
  setTheme: () => undefined,
});

export function useThemeMode() {
  return useContext(ThemeContext);
}
