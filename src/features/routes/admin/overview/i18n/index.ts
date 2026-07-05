import { routing, type Locale } from '@/i18n/routing';
import { adminOverviewEn } from './en';
import { adminOverviewTr } from './tr';

const messages = {
  tr: adminOverviewTr,
  en: adminOverviewEn,
} as const;

export function getAdminOverviewCopy(locale: Locale = routing.defaultLocale) {
  return messages[locale];
}
