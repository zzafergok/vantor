import { routing, type Locale } from '@/i18n/routing';
import { publicLoginEn } from './en';
import { publicLoginTr } from './tr';

const messages = {
  tr: publicLoginTr,
  en: publicLoginEn,
} as const;

export function getPublicLoginCopy(locale: Locale = routing.defaultLocale) {
  return messages[locale];
}
