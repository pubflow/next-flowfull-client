'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { KeyRound } from 'lucide-react';
import { PasswordResetForm } from '@pubflow/react';
import { useTranslation } from 'react-i18next';
import { AuthPageShell } from '@/components/auth/auth-page-shell';
import { PUBFLOW_CONFIG } from '@/lib/pubflow-config';

export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <ForgotPasswordContent />
    </Suspense>
  );
}

function ForgotPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const token = searchParams.get('token') || undefined;

  return (
    <AuthPageShell
      eyebrow={t('passwordReset.eyebrow')}
      title={token ? t('passwordReset.resetTitle') : t('passwordReset.title')}
      subtitle={token ? t('passwordReset.resetSubtitle') : t('passwordReset.subtitle')}
      icon={KeyRound}
    >
      <PasswordResetForm
        config={{
          primaryColor: PUBFLOW_CONFIG.PRIMARY_COLOR,
          appName: PUBFLOW_CONFIG.APP_NAME,
          logo: PUBFLOW_CONFIG.APP_LOGO,
          apiBaseUrl: PUBFLOW_CONFIG.API_BASE_URL,
        }}
        resetToken={token}
        onSuccess={() => {
          router.replace(`/login?message=${encodeURIComponent(t('passwordReset.success'))}`);
        }}
        onError={(error) => console.error('Password reset error:', error)}
        onBackToLogin={() => router.push('/login')}
      />
    </AuthPageShell>
  );
}
