'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';
import { useAuth } from '@pubflow/react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { isEmbeddedPreviewRuntime } from '@/lib/pubflow-config';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();
  const { isAuthenticated, isLoading } = useAuth();
  // Fail closed while mounting so host session cookies never bounce the iframe.
  const [embedded, setEmbedded] = useState(true);

  useEffect(() => {
    setEmbedded(isEmbeddedPreviewRuntime());
  }, []);

  useEffect(() => {
    if (embedded) return;
    if (!isLoading && !isAuthenticated) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [embedded, isAuthenticated, isLoading, pathname, router]);

  // Coding-agent iframe: never bounce to host /login (shared platform origin).
  if (embedded) {
    return <>{children}</>;
  }

  if (isLoading || !isAuthenticated) {
    return (
      <main className="center-screen">
        <Card className="status-panel">
          <ShieldCheck size={28} />
          <div>
            <p className="eyebrow">{t('status.protected')}</p>
            <h1>{isLoading ? t('status.loading') : t('status.redirecting')}</h1>
          </div>
        </Card>
      </main>
    );
  }

  return <>{children}</>;
}
