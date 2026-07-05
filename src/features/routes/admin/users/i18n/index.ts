import { routing, type Locale } from '@/i18n/routing';
import { adminUsersEn } from './en';
import { adminUsersTr } from './tr';

const messages = {
  tr: adminUsersTr,
  en: adminUsersEn,
} as const;

export function getAdminUsersCopy(locale: Locale = routing.defaultLocale) {
  return messages[locale];
}
