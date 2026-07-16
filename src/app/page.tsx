"use client";

import dynamic from 'next/dynamic';
import { PreviewWelcomeLite } from '@/components/preview-welcome-lite';
import { PUBFLOW_CONFIG } from '@/lib/pubflow-config';

const HomeAuthEntry = dynamic(
  () => import('@/components/home-auth-entry').then((mod) => mod.HomeAuthEntry),
  {
    ssr: false,
    loading: () => <PreviewWelcomeLite />,
  },
);

export default function Home() {
  if (PUBFLOW_CONFIG.PREVIEW_MODE) {
    return <PreviewWelcomeLite />;
  }

  return <HomeAuthEntry />;
}
