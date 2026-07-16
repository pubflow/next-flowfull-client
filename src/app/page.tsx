import { HomeAuthEntry } from '@/components/home-auth-entry';
import { PreviewWelcome } from '@/components/preview-welcome';
import { PUBFLOW_CONFIG } from '@/lib/pubflow-config';

export default function Home() {
  if (PUBFLOW_CONFIG.PREVIEW_MODE) {
    return <PreviewWelcome />;
  }

  return <HomeAuthEntry />;
}
