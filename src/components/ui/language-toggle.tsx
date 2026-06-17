'use client';

import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function LanguageToggle() {
  const { i18n, t } = useTranslation();

  return (
    <div className="segmented-control" aria-label="Language">
      <Button
        type="button"
        size="icon-sm"
        variant="ghost"
        className="segmented-button"
        title={i18n.language?.startsWith('es') ? t('language.english') : t('language.spanish')}
        aria-label={i18n.language?.startsWith('es') ? t('language.english') : t('language.spanish')}
        onClick={() => i18n.changeLanguage(i18n.language?.startsWith('es') ? 'en' : 'es')}
      >
        <Languages size={16} />
      </Button>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        className={cn('segmented-text', i18n.language?.startsWith('es') && 'is-active')}
        onClick={() => i18n.changeLanguage('es')}
      >
        ES
      </Button>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        className={cn('segmented-text', !i18n.language?.startsWith('es') && 'is-active')}
        onClick={() => i18n.changeLanguage('en')}
      >
        EN
      </Button>
    </div>
  );
}
