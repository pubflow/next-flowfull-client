import { PUBFLOW_CONFIG } from '@/lib/pubflow-config';

export function AppLogo({ compact = false }: { compact?: boolean }) {
  const appName = PUBFLOW_CONFIG.APP_NAME;

  if (PUBFLOW_CONFIG.APP_LOGO) {
    return (
      <div className="app-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={PUBFLOW_CONFIG.APP_LOGO} alt={`${appName} logo`} />
        {!compact ? <span>{appName}</span> : null}
      </div>
    );
  }

  return (
    <div className="app-logo">
      <div className="app-logo-mark">{appName.slice(0, 2).toUpperCase()}</div>
      {!compact ? <span>{appName}</span> : null}
    </div>
  );
}
