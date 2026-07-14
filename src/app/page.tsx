'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@pubflow/react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { PreviewWelcome } from '@/components/preview-welcome';
import {
  isPreviewRuntime,
  PUBFLOW_CONFIG,
} from '@/lib/pubflow-config';

const AUTH_BOOT_TIMEOUT_MS = 3_000;

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation();
  const { isAuthenticated, isLoading } = useAuth();
  // Fail closed: assume embedded until the client proves otherwise so host
  // Flowfull session cookies cannot soft-navigate the iframe to /dashboard.
  const [embeddedPreview, setEmbeddedPreview] = useState(true);
  const [ready, setReady] = useState(false);
  const [authTimedOut, setAuthTimedOut] = useState(false);

  useEffect(() => {
    const detected = isPreviewRuntime();
    setEmbeddedPreview((prev) => {
      // Never downgrade out of preview-safe mode while framed.
      if (typeof window !== 'undefined' && window.parent !== window) {
        return detected || prev;
      }
      return detected;
    });
    setReady(true);
  }, []);

  useEffect(() => {
    if (embeddedPreview || PUBFLOW_CONFIG.PREVIEW_MODE) return;
    if (!isLoading) {
      setAuthTimedOut(false);
      return;
    }
    const timer = window.setTimeout(() => setAuthTimedOut(true), AUTH_BOOT_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [embeddedPreview, isLoading]);

  useEffect(() => {
    if (!ready) return;
    // In Nodepod the iframe shares platform.pubflow.com with Flowfull. Absolute
    // `/login` / `/dashboard` navigations escape the `/__preview__/…` prefix and
    // load the host console — never soft-route away while embedded.
    if (embeddedPreview || PUBFLOW_CONFIG.PREVIEW_MODE || isLoading) return;
    router.replace(isAuthenticated ? '/dashboard' : '/login');
  }, [ready, embeddedPreview, isAuthenticated, isLoading, router]);

  const inPreview = embeddedPreview || PUBFLOW_CONFIG.PREVIEW_MODE;

  // Preview: show welcome immediately (SSR + client) — never block on !ready or auth.
  if (inPreview) {
    return <PreviewWelcome />;
  }

  // Production: auth hung — fall back to welcome instead of an infinite spinner.
  if (authTimedOut && isLoading) {
    return <PreviewWelcome />;
  }

  if (!ready || isLoading) {
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
