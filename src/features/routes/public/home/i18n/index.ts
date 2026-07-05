import { routing, type Locale } from '@/i18n/routing';
import { publicHomeEn } from './en';
import { publicHomeTr } from './tr';

const messages = {
  tr: publicHomeTr,
  en: publicHomeEn,
} as const;

export function getPublicHomeCopy(locale: Locale = routing.defaultLocale) {
  return messages[locale];
}
