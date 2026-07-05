import { routing, type Locale } from '@/i18n/routing';
import { authSettingsEn } from './en';
import { authSettingsTr } from './tr';

const messages = {
  tr: authSettingsTr,
  en: authSettingsEn,
} as const;

export function getAuthSettingsCopy(locale: Locale = routing.defaultLocale) {
  return messages[locale];
}
