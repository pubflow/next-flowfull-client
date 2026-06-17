'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useThemeMode, type ThemeMode } from '@/components/providers';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const modes: Array<{ mode: ThemeMode; icon: typeof Sun; labelKey: string }> = [
  { mode: 'light', icon: Sun, labelKey: 'theme.light' },
  { mode: 'dark', icon: Moon, labelKey: 'theme.dark' },
  { mode: 'system', icon: Monitor, labelKey: 'theme.system' },
];

export function ThemeToggle() {
  const { t } = useTranslation();
  const { theme, setTheme } = useThemeMode();

  return (
    <div className="segmented-control" aria-label="Theme">
      {modes.map(({ mode, icon: Icon, labelKey }) => (
        <Button
          key={mode}
          type="button"
          size="icon-sm"
          variant="ghost"
          className={cn('segmented-button', theme === mode && 'is-active')}
          onClick={() => setTheme(mode)}
          title={t(labelKey)}
          aria-label={t(labelKey)}
        >
          <Icon size={16} />
        </Button>
      ))}
    </div>
  );
}
