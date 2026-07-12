'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LogIn, ShieldCheck } from 'lucide-react';
import { useAuth } from '@pubflow/react';
import { useTranslation } from 'react-i18next';
import { AuthPageShell } from '@/components/auth/auth-page-shell';
import { CustomLoginForm, type LoginStep } from '@/components/auth/pubflow-auth-forms';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  buildSocialLoginUrl,
  getRedirectUrl,
  isEmbeddedPreviewRuntime,
  previewAwareHref,
} from '@/lib/pubflow-config';

export default function LoginPage() {
  return (
    <Suspense>
      <LoginPageContent />
    </Suspense>
  );
}

function navigateApp(path: string, router: ReturnType<typeof useRouter>) {
  if (isEmbeddedPreviewRuntime()) {
    window.location.assign(previewAwareHref(path));
    return;
  }
  router.push(path);
}

function replaceApp(path: string, router: ReturnType<typeof useRouter>) {
  if (isEmbeddedPreviewRuntime()) {
    window.location.replace(previewAwareHref(path));
    return;
  }
  router.replace(path);
}

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const { isAuthenticated, user } = useAuth();
  const message = searchParams.get('message');
  const redirectPath = getRedirectUrl(`?${searchParams.toString()}`);
  const [step, setStep] = useState<LoginStep>('credentials');

  useEffect(() => {
    if (isAuthenticated && user) {
      replaceApp(redirectPath, router);
    }
  }, [isAuthenticated, redirectPath, router, user]);

  const isTwoFactor = step === 'two-factor';

  return (
    <AuthPageShell
      eyebrow={isTwoFactor ? t('authCustom.twoFactorTitle', 'Verify it is you') : t('login.title')}
      title={isTwoFactor ? t('authCustom.twoFactorTitle', 'Verify it is you') : t('login.cardTitle', 'Welcome back')}
      subtitle={
        isTwoFactor
          ? t('authCustom.twoFactorSubtitle', 'Enter the security code for your Flowless account.')
          : t('login.subtitle')
      }
      icon={isTwoFactor ? ShieldCheck : LogIn}
    >
      {message ? (
        <Alert className="auth-message">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      ) : null}

      <CustomLoginForm
        redirectPath={redirectPath}
        onStepChange={setStep}
        onSuccess={() => replaceApp(redirectPath, router)}
        onError={(error) => console.error('Login error:', error)}
        onPasswordReset={() => navigateApp('/forgot-password', router)}
        onAccountCreation={() => navigateApp('/register', router)}
        onSocialLogin={(provider) => {
          window.location.href = buildSocialLoginUrl(provider, redirectPath);
        }}
      />
    </AuthPageShell>
  );
}
