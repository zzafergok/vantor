export const locales = ['tr', 'en'] as const;
export type Locale = (typeof locales)[number];

export const routing = {
  locales,
  defaultLocale: 'en' satisfies Locale,
  localePrefix: 'never',
} as const;

const localeSet = new Set<Locale>(locales);

export function normalizeLocale(value: unknown): Locale | null {
  if (typeof value !== 'string') return null;
  return localeSet.has(value as Locale) ? (value as Locale) : null;
}
