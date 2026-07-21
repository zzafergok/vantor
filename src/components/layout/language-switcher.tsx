'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { routing, type Locale } from '@/i18n/routing';
import {
  useCurrentLocale,
  useSwitchLocale,
} from '@/components/providers/client-locale-provider';
import { cn } from '@/lib/utils';

const localeLabels: Record<Locale, string> = {
  en: 'EN',
  tr: 'TR',
};

export function LanguageSwitcher() {
  const locale = useCurrentLocale();
  const switchLocale = useSwitchLocale();
  const router = useRouter();
  const [pendingLocale, setPendingLocale] = useState<Locale | null>(null);

  const handleLocaleChange = async (nextLocale: Locale) => {
    if (nextLocale === locale || pendingLocale) return;

    setPendingLocale(nextLocale);
    try {
      await switchLocale(nextLocale);
      router.refresh();
    } finally {
      setPendingLocale(null);
    }
  };

  return (
    <div className="flex h-8 items-stretch overflow-hidden rounded-none border border-gunmetal">
      {routing.locales.map((item) => (
        <button
          key={item}
          onClick={() => void handleLocaleChange(item)}
          disabled={item === locale || pendingLocale !== null}
          className={cn(
            'flex h-full min-w-8 items-center justify-center px-2 font-mono text-[10px] font-bold uppercase tracking-widest transition-all',
            item === locale
              ? 'pointer-events-none bg-vantor-blue text-white'
              : 'text-ash hover:bg-gunmetal/30 hover:text-titanium',
          )}
        >
          {localeLabels[item]}
        </button>
      ))}
    </div>
  );
}
