'use client';

import { useEffect, useState } from 'react';
import { Code2, LayoutDashboard, LogIn, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { isEmbeddedPreviewRuntime, previewAwareHref } from '@/lib/pubflow-config';

export function HomeWelcome() {
  const { t } = useTranslation();
  const [hrefs, setHrefs] = useState({ login: '/login', dashboard: '/dashboard' });
  useEffect(() => {
    if (!isEmbeddedPreviewRuntime()) return;
    setHrefs({ login: previewAwareHref('/login'), dashboard: previewAwareHref('/dashboard') });
  }, []);
  // Full-page navigations keep the `/__preview__/pod…/port` prefix so the
  // Nodepod service worker can proxy into the Next app (Next <Link href="/login">
  // would jump to the host Flowfull console).
  const loginHref = hrefs.login;
  const dashboardHref = hrefs.dashboard;

  return (
    <main className="home-welcome-shell">
      <section className="home-welcome-hero">
        <div className="home-welcome-logo" aria-hidden="true">
          <img src="/Pubflow-Favicon.png" alt="" />
        </div>
        <Badge variant="secondary" className="eyebrow-badge">
          <Sparkles size={14} />
          {t('home.welcome.eyebrow')}
        </Badge>
        <h1>{t('home.welcome.title')}</h1>
        <p>{t('home.welcome.subtitle')}</p>
        <div className="home-welcome-actions">
          <Button asChild size="lg">
            <a href={loginHref}>
              <LogIn size={16} />
              {t('actions.goLogin')}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={dashboardHref}>
              <LayoutDashboard size={16} />
              {t('actions.openDashboard')}
            </a>
          </Button>
        </div>
      </section>

      <Card className="home-welcome-card">
        <CardHeader>
          <CardTitle>{t('home.welcome.editTitle')}</CardTitle>
          <CardDescription>{t('home.welcome.editSubtitle')}</CardDescription>
        </CardHeader>
        <CardContent className="home-welcome-steps">
          <div>
            <Code2 size={18} />
            <span>{t('home.welcome.steps.home')}</span>
          </div>
          <div>
            <Code2 size={18} />
            <span>{t('home.welcome.steps.auth')}</span>
          </div>
          <div>
            <Code2 size={18} />
            <span>{t('home.welcome.steps.config')}</span>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
