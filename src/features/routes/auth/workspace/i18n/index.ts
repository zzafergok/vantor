import { routing, type Locale } from '@/i18n/routing';
import { authWorkspaceEn } from './en';
import { authWorkspaceTr } from './tr';

const messages = {
  tr: authWorkspaceTr,
  en: authWorkspaceEn,
} as const;

export function getAuthWorkspaceCopy(locale: Locale = routing.defaultLocale) {
  return messages[locale];
}
