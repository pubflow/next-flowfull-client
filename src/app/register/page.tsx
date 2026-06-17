'use client';

import { useRouter } from 'next/navigation';
import { UserPlus } from 'lucide-react';
import { AccountCreationForm } from '@pubflow/react';
import { useTranslation } from 'react-i18next';
import { AuthPageShell } from '@/components/auth/auth-page-shell';
import { PUBFLOW_CONFIG } from '@/lib/pubflow-config';

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <AuthPageShell
      eyebrow={t('register.eyebrow')}
      title={t('register.title')}
      subtitle={t('register.subtitle')}
      icon={UserPlus}
    >
      <AccountCreationForm
        config={{
          primaryColor: PUBFLOW_CONFIG.PRIMARY_COLOR,
          appName: PUBFLOW_CONFIG.APP_NAME,
          logo: PUBFLOW_CONFIG.APP_LOGO,
          apiBaseUrl: PUBFLOW_CONFIG.API_BASE_URL,
          requiredFields: ['name', 'lastName', 'email', 'password'],
        }}
        onSuccess={() => {
          router.replace(`/login?message=${encodeURIComponent(t('register.success'))}`);
        }}
        onError={(error) => console.error('Account creation error:', error)}
        onBackToLogin={() => router.push('/login')}
      />
    </AuthPageShell>
  );
}
