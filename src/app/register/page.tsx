'use client';

import { useRouter } from 'next/navigation';
import { UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AuthPageShell } from '@/components/auth/auth-page-shell';
import { CustomRegisterForm } from '@/components/auth/pubflow-auth-forms';

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
      <CustomRegisterForm
        onSuccess={() => {
          router.replace(`/login?message=${encodeURIComponent(t('register.success'))}`);
        }}
        onError={(error) => console.error('Account creation error:', error)}
        onBackToLogin={() => router.push('/login')}
      />
    </AuthPageShell>
  );
}
