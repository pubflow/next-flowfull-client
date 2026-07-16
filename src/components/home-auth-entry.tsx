'use client';

import dynamic from 'next/dynamic';
import { PreviewWelcome } from '@/components/preview-welcome';

const HomeAuthRedirect = dynamic(
  () => import('@/components/home-auth-redirect').then((mod) => mod.HomeAuthRedirect),
  {
    ssr: false,
    loading: () => <PreviewWelcome />,
  },
);

export function HomeAuthEntry() {
  return <HomeAuthRedirect />;
}
