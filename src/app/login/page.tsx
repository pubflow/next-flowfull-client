'use client';

import { useEffect } from 'react';
import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LogIn } from 'lucide-react';
import { LoginForm, useAuth } from '@pubflow/react';
import { useTranslation } from 'react-i18next';
import { AppLogo } from '@/components/ui/app-logo';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { PUBFLOW_CONFIG, getRedirectUrl } from '@/lib/pubflow-config';

export default function LoginPage() {
  return (
    <Suspense>
      <LoginPageContent />
    </Suspense>
  );
}

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const { isAuthenticated, user } = useAuth();
  const message = searchParams.get('message');
  const redirectPath = getRedirectUrl(`?${searchParams.toString()}`);

  useEffect(() => {
    if (isAuthenticated && user) {
      router.replace(redirectPath);
    }
  }, [isAuthenticated, redirectPath, router, user]);

  return (
    <main className="login-shell">
      <section className="login-form-panel">
        <div className="login-toolbar">
          <AppLogo />
          <div className="topbar-actions">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>

        <div className="login-form-heading">
          <div className="eyebrow">
            <LogIn size={14} />
            <span>{t('login.title')}</span>
          </div>
          <h2>{PUBFLOW_CONFIG.APP_NAME}</h2>
          <p>{t('login.subtitle')}</p>
        </div>

        {message ? (
          <Alert className="auth-message">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        ) : null}

        <LoginForm
          config={{
            primaryColor: PUBFLOW_CONFIG.PRIMARY_COLOR,
            secondaryColor: PUBFLOW_CONFIG.SECONDARY_COLOR,
            appName: PUBFLOW_CONFIG.APP_NAME,
            logo: PUBFLOW_CONFIG.APP_LOGO,
            showPasswordReset: PUBFLOW_CONFIG.ENABLE_PASSWORD_RESET,
            showAccountCreation: PUBFLOW_CONFIG.ENABLE_ACCOUNT_CREATION,
            redirectPath,
            subtitle: t('login.subtitle'),
            twoFactorSubtitle: t('login.subtitle'),
          }}
          onSuccess={() => router.replace(redirectPath)}
          onTwoFactorSuccess={() => router.replace(redirectPath)}
          onError={(error) => console.error('Login error:', error)}
          onPasswordReset={() => router.push('/forgot-password')}
          onAccountCreation={() => router.push('/register')}
        />
      </section>
    </main>
  );
}
