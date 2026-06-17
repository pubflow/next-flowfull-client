'use client';

import { Activity, Palette, Rocket, ShieldCheck, UserRound, type LucideIcon } from 'lucide-react';
import { useAuth } from '@pubflow/react';
import { useTranslation } from 'react-i18next';
import { AuthGuard } from '@/components/auth-guard';
import { Topbar } from '@/components/layout/topbar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PUBFLOW_CONFIG } from '@/lib/pubflow-config';

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}

function DashboardContent() {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const displayName = user?.name || user?.email || user?.userName || t('dashboard.welcome');

  return (
    <main className="app-shell">
      <Topbar />

      <section className="dashboard-hero">
        <div>
          <Badge variant="secondary" className="eyebrow-badge">{t('dashboard.signedIn')}</Badge>
          <h1>{t('dashboard.title')}</h1>
          <p>{t('dashboard.subtitle')}</p>
        </div>
        <div className="user-pill">
          <UserRound size={18} />
          <span>{displayName}</span>
        </div>
      </section>

      <section className="metric-grid">
        <InfoCard icon={ShieldCheck} label={t('dashboard.cards.auth')} value={isAuthenticated ? 'Active' : 'Pending'} />
        <InfoCard icon={UserRound} label={t('dashboard.userData')} value={displayName} />
        <InfoCard icon={Palette} label={t('dashboard.cards.experience')} value={PUBFLOW_CONFIG.APP_NAME} />
        <InfoCard icon={Rocket} label={t('dashboard.cards.deploy')} value="Next ready" />
      </section>

      <section className="dashboard-grid">
        <Card className="panel span-2">
          <CardHeader className="panel-heading">
            <Activity size={18} />
            <div>
              <CardTitle>{t('dashboard.userData')}</CardTitle>
              <CardDescription>{t('dashboard.modules')}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="json-panel">{JSON.stringify(user || {}, null, 2)}</pre>
          </CardContent>
        </Card>

        <Card className="panel">
          <CardHeader>
            <CardTitle>{t('dashboard.cards.experience')}</CardTitle>
            <CardDescription>{t('dashboard.cards.experienceText')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="quiet-list">
              <span>{PUBFLOW_CONFIG.APP_NAME}</span>
              <span>{PUBFLOW_CONFIG.DEFAULT_LANGUAGE.toUpperCase()}</span>
              <span>{PUBFLOW_CONFIG.DEFAULT_THEME}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="panel">
          <CardHeader>
            <CardTitle>{t('dashboard.cards.deploy')}</CardTitle>
            <CardDescription>{t('dashboard.cards.deployText')}</CardDescription>
          </CardHeader>
          <CardContent>
            <code className="code-block">npm run build</code>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function InfoCard({ icon: Icon, label, value }: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <Card className="metric-card">
      <Icon size={18} />
      <span>{label}</span>
      <strong>{value}</strong>
    </Card>
  );
}
