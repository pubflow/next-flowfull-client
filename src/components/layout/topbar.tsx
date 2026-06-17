'use client';

import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { useAuth } from '@pubflow/react';
import { useTranslation } from 'react-i18next';
import { AppLogo } from '@/components/ui/app-logo';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export function Topbar() {
  const { t } = useTranslation();
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="topbar">
      <Link href="/dashboard" className="topbar-brand">
        <AppLogo />
      </Link>
      <nav className="topbar-actions">
        <ThemeToggle />
        <LanguageToggle />
        {isAuthenticated ? (
          <Button type="button" variant="outline" onClick={() => logout()}>
            <LogOut size={16} />
            <span>{t('nav.logout')}</span>
          </Button>
        ) : (
          <Button asChild>
            <Link href="/login">{t('nav.login')}</Link>
          </Button>
        )}
      </nav>
    </header>
  );
}
