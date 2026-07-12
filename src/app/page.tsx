'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@pubflow/react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { PreviewWelcome } from '@/components/preview-welcome';
import {
  isEmbeddedPreviewRuntime,
  PUBFLOW_CONFIG,
} from '@/lib/pubflow-config';

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation();
  const { isAuthenticated, isLoading } = useAuth();
  const embeddedPreview = isEmbeddedPreviewRuntime();

  useEffect(() => {
    // In Nodepod the iframe shares platform.pubflow.com with Flowfull. Absolute
    // `/login` / `/dashboard` navigations escape the `/__preview__/…` prefix and
    // load the host console — never soft-route away while embedded.
    if (embeddedPreview || PUBFLOW_CONFIG.PREVIEW_MODE || isLoading) return;
    router.replace(isAuthenticated ? '/dashboard' : '/login');
  }, [embeddedPreview, isAuthenticated, isLoading, router]);

  if (embeddedPreview || PUBFLOW_CONFIG.PREVIEW_MODE) {
    return <PreviewWelcome />;
  }

  return (
    <main className="center-screen">
      <Card className="status-panel">
        <Loader2 className="spin" size={28} />
        <div>
          <p className="eyebrow">{t('home.preparing')}</p>
          <h1>{t('home.checking')}</h1>
        </div>
      </Card>
    </main>
  );
}
