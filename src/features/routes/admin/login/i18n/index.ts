import { routing, type Locale } from '@/i18n/routing';
import { adminLoginEn } from './en';
import { adminLoginTr } from './tr';

const messages = {
  tr: adminLoginTr,
  en: adminLoginEn,
} as const;

export function getAdminLoginCopy(locale: Locale = routing.defaultLocale) {
  return messages[locale];
}
