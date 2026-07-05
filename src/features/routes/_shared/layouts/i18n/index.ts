import { routing, type Locale } from '@/i18n/routing';
import { shellEn } from './en';
import { shellTr } from './tr';

const messages = {
  tr: shellTr,
  en: shellEn,
} as const;

export function getShellCopy(locale: Locale = routing.defaultLocale) {
  return messages[locale];
}
