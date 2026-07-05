import { routing, type Locale } from '@/i18n/routing';
import { adminSettingsEn } from './en';
import { adminSettingsTr } from './tr';

const messages = {
  tr: adminSettingsTr,
  en: adminSettingsEn,
} as const;

export function getAdminSettingsCopy(locale: Locale = routing.defaultLocale) {
  return messages[locale];
}
