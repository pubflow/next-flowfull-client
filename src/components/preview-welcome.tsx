'use client';

import { useEffect, useState } from 'react';
import { Code2, LayoutDashboard, LogIn, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { isEmbeddedPreviewRuntime, previewAwareHref } from '@/lib/pubflow-config';

export function PreviewWelcome() {
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
    <main className="preview-welcome-shell">
      <section className="preview-welcome-hero">
        <div className="preview-welcome-logo" aria-hidden="true">
          <img src="/Pubflow-Favicon.png" alt="" />
        </div>
        <Badge variant="secondary" className="eyebrow-badge">
          <Sparkles size={14} />
          Coding preview
        </Badge>
        <h1>Welcome to your Pubflow App</h1>
        <p>
          This friendly preview starts here so you can edit confidently. Your login,
          dashboard, auth bridge, theme, and deploy scripts are still ready.
        </p>
        <div className="preview-welcome-actions">
          <Button asChild size="lg">
            <a href={loginHref}>
              <LogIn size={16} />
              Go to sign in
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={dashboardHref}>
              <LayoutDashboard size={16} />
              Open dashboard
            </a>
          </Button>
        </div>
      </section>

      <Card className="preview-welcome-card">
        <CardHeader>
          <CardTitle>Start customizing</CardTitle>
          <CardDescription>
            Ask ZenoCode to change the copy, layout, colors, auth flow, or dashboard modules.
          </CardDescription>
        </CardHeader>
        <CardContent className="preview-welcome-steps">
          <div>
            <Code2 size={18} />
            <span>Edit src/app/page.tsx to change this first screen.</span>
          </div>
          <div>
            <Code2 size={18} />
            <span>Open /login to test the Flowless authentication flow.</span>
          </div>
          <div>
            <Code2 size={18} />
            <span>Update src/lib/pubflow-config.ts or environment variables for branding and API URLs.</span>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
