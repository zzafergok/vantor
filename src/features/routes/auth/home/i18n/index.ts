import { routing, type Locale } from '@/i18n/routing';
import { authHomeEn } from './en';
import { authHomeTr } from './tr';

const messages = {
  tr: authHomeTr,
  en: authHomeEn,
} as const;

export function getAuthHomeCopy(locale: Locale = routing.defaultLocale) {
  return messages[locale];
}
