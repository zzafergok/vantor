interface FormatPercentOptions {
  decimals?: number;
  locale?: string;
  clamp?: boolean;
  suffix?: boolean;
  fallback?: string;
  min?: number;
  max?: number;
  useGrouping?: boolean;
  showPositiveSign?: boolean;
}

export function formatPercent(
  value: number,
  options: FormatPercentOptions = {},
): string {
  const {
    decimals = 2,
    locale = 'tr-TR',
    clamp = true,
    suffix = false,
    fallback,
    min,
    max,
    useGrouping = false,
    showPositiveSign = false,
  } = options;

  if (!Number.isFinite(value)) {
    if (fallback !== undefined) return fallback;
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(0);
  }

  let processedValue = clamp ? Math.max(0, Math.min(100, value)) : value;

  if (min !== undefined && processedValue > 0 && processedValue < min) {
    const formattedMin = new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(min);
    return `<${formattedMin}${suffix ? '%' : ''}`;
  }

  if (max !== undefined && processedValue > max) {
    const formattedMax = new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(max);
    return `>${formattedMax}${suffix ? '%' : ''}`;
  }

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping,
    signDisplay: showPositiveSign ? 'exceptZero' : 'auto',
  }).format(processedValue);
  return suffix ? `${formatted}%` : formatted;
}

interface FormatCurrencyOptions {
  decimals?: number | 'auto';
  locale?: string;
  currency?: string;
  symbol?: boolean;
  compact?: boolean;
  fallback?: string;
  scientific?: boolean;
  min?: number;
  showPositiveSign?: boolean;
}

export function formatCurrency(
  value: number,
  options: FormatCurrencyOptions = {},
): string {
  const {
    decimals = 'auto',
    locale = 'en-US',
    currency = 'USD',
    symbol = true,
    compact = false,
    fallback,
    scientific = false,
    min,
    showPositiveSign = false,
  } = options;

  if (!Number.isFinite(value)) {
    if (fallback !== undefined) return fallback;
    return symbol ? '$0.00' : '0.00';
  }

  if (min !== undefined && value > 0 && value < min) {
    return `<${formatCurrency(min, { ...options, min: undefined })}`;
  }

  if (scientific && Math.abs(value) > 0 && Math.abs(value) < 0.0001) {
    const exponent = Math.floor(Math.log10(Math.abs(value)));
    const mantissa = value / Math.pow(10, exponent);
    const superscriptMap: Record<string, string> = {
      '0': '⁰',
      '1': '¹',
      '2': '²',
      '3': '³',
      '4': '⁴',
      '5': '⁵',
      '6': '⁶',
      '7': '⁷',
      '8': '⁸',
      '9': '⁹',
      '-': '⁻',
    };
    const superscriptExp = String(exponent)
      .split('')
      .map((character) => superscriptMap[character] || character)
      .join('');
    return `${symbol ? '$' : ''}${mantissa.toFixed(2)}×10${superscriptExp}`;
  }

  const decimalPlaces =
    decimals === 'auto'
      ? Math.abs(value) < 0.01
        ? 6
        : Math.abs(value) < 1
          ? 4
          : 2
      : decimals;

  if (compact && Math.abs(value) >= 1000) {
    return new Intl.NumberFormat(locale, {
      style: symbol ? 'currency' : 'decimal',
      currency: symbol ? currency : undefined,
      notation: 'compact',
      compactDisplay: 'short',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
      signDisplay: showPositiveSign ? 'exceptZero' : 'auto',
    }).format(value);
  }

  return new Intl.NumberFormat(locale, {
    style: symbol ? 'currency' : 'decimal',
    currency: symbol ? currency : undefined,
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
    signDisplay: showPositiveSign ? 'exceptZero' : 'auto',
  }).format(value);
}

interface FormatDurationOptions {
  unit?: 'milliseconds' | 'seconds' | 'hours';
  decimals?: number;
  suffix?: boolean;
  locale?: string;
  fallback?: string;
  compact?: boolean;
}

export function formatDuration(
  value: number,
  options: FormatDurationOptions = {},
): string {
  const {
    unit = 'milliseconds',
    decimals = 1,
    suffix = true,
    locale = 'tr-TR',
    fallback,
    compact = false,
  } = options;

  if (!Number.isFinite(value)) {
    if (fallback !== undefined) return fallback;
    return suffix ? '0s' : '0';
  }

  const seconds =
    unit === 'milliseconds'
      ? value / 1000
      : unit === 'hours'
        ? value * 3600
        : value;
  let outputValue = unit === 'milliseconds' ? seconds : value;
  let unitSuffix = unit === 'hours' ? 'h' : 's';

  if (compact) {
    if (seconds >= 3600) {
      outputValue = seconds / 3600;
      unitSuffix = 'h';
    } else if (seconds >= 60) {
      outputValue = seconds / 60;
      unitSuffix = 'm';
    } else {
      outputValue = seconds;
      unitSuffix = 's';
    }
  }

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(outputValue);
  return suffix ? `${formatted}${unitSuffix}` : formatted;
}

export function roundTo(value: number, decimals: number = 2): number {
  if (!Number.isFinite(value)) return 0;
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
