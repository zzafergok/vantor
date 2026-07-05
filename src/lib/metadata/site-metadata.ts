import type { Metadata } from 'next';

import { routing, type Locale } from '@/i18n/routing';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  'https://vantor.dev';

export const siteMetadata = {
  name: 'Vantor',
  legalName: 'Vantor Application Template',
  description:
    'A premium, domain-neutral Next.js application template for public, authenticated, and admin product surfaces.',
  url: new URL(siteUrl),
  creator: 'Vantor',
  publisher: 'Vantor',
  keywords: [
    'Vantor',
    'Next.js template',
    'application shell',
    'admin dashboard',
    'authenticated workspace',
    'domain-neutral product foundation',
  ],
  assets: {
    icon16: '/assets/images/favicon-16x16.png',
    icon32: '/assets/images/favicon-32x32.png',
    icon48: '/assets/images/favicon-48x48.png',
    shortcutIcon: '/favicon.ico',
    appleTouchIcon: '/assets/images/apple-touch-icon.png',
    android192: '/assets/images/android-chrome-192x192.png',
    android512: '/assets/images/android-chrome-512x512.png',
    logo: '/assets/images/vantor-brand-mark.jpeg',
    openGraph: '/assets/images/vantor-open-graph.jpeg',
  },
  aiSummary:
    'Vantor is a domain-neutral Next.js application foundation with public, authenticated, and admin route groups, reusable UI primitives, and cookie-aware access rules.',
} as const;

type RouteRobots = {
  index: boolean;
  follow: boolean;
};

type RouteSection = 'public' | 'auth' | 'admin';

export type MetadataRouteId =
  | 'publicHome'
  | 'publicLogin'
  | 'authHome'
  | 'authWorkspace'
  | 'authSettings'
  | 'adminLogin'
  | 'adminOverview'
  | 'adminUsers'
  | 'adminSettings';

type LocalizedRouteMetadata = {
  title: string;
  description: string;
  aiPurpose: string;
};

type RouteMetadataDescriptor = {
  path: string;
  section: RouteSection;
  robots: RouteRobots;
  locale: Record<Locale, LocalizedRouteMetadata>;
};

export type RouteMetadataInput = {
  path: string;
  section?: RouteSection;
  robots?: RouteRobots;
  locale?: Partial<Record<Locale, Partial<LocalizedRouteMetadata>>>;
  title?: string;
  description?: string;
  aiPurpose?: string;
};

export type DynamicRouteMetadataInput = RouteMetadataInput & {
  canonicalPath?: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
};

export const routeMetadata = {
  publicHome: {
    path: '/',
    section: 'public',
    robots: { index: true, follow: true },
    locale: {
      en: {
        title: 'Composed Next.js Application Foundation',
        description:
          'Build public pages, authenticated work areas, and internal management screens on a premium domain-neutral Next.js foundation.',
        aiPurpose:
          'Primary public overview for AI agents summarizing the Vantor application template.',
      },
      tr: {
        title: 'Dengeli Next.js Uygulama Temeli',
        description:
          'Public sayfalar, yetkili calisma alanlari ve ic yonetim ekranlari icin premium, domain bagimsiz Next.js temeli.',
        aiPurpose:
          'Vantor uygulama sablonunu ozetleyen AI ajanlari icin ana public tanitim ekrani.',
      },
    },
  },
  publicLogin: {
    path: '/login',
    section: 'public',
    robots: { index: false, follow: false },
    locale: {
      en: {
        title: 'Sign in',
        description:
          'Placeholder sign-in surface for future authentication provider integrations.',
        aiPurpose:
          'Public login entry point; excluded from indexing because it is transactional.',
      },
      tr: {
        title: 'Giris yap',
        description:
          'Gelecekteki kimlik saglayici entegrasyonlari icin placeholder giris yuzeyi.',
        aiPurpose:
          'Public giris noktasi; islemsel oldugu icin indekslemeden haric tutulur.',
      },
    },
  },
  authHome: {
    path: '/home',
    section: 'auth',
    robots: { index: false, follow: false },
    locale: {
      en: {
        title: 'Dashboard overview',
        description:
          'Protected dashboard overview with neutral sample data for future product modules.',
        aiPurpose:
          'Authenticated dashboard route; metadata is descriptive but not intended for indexing.',
      },
      tr: {
        title: 'Dashboard ozeti',
        description:
          'Gelecekteki urun modulleri icin notr ornek verilerle korumali dashboard ozeti.',
        aiPurpose:
          'Yetkili dashboard route; metadata aciklayicidir ama indeksleme icin degildir.',
      },
    },
  },
  authWorkspace: {
    path: '/workspace',
    section: 'auth',
    robots: { index: false, follow: false },
    locale: {
      en: {
        title: 'Items workspace',
        description:
          'Protected generic list workspace for future authenticated application modules.',
        aiPurpose:
          'Authenticated workspace route for internal records; excluded from public AI discovery.',
      },
      tr: {
        title: 'Oge calisma alani',
        description:
          'Gelecekteki yetkili uygulama modulleri icin korumali genel liste calisma alani.',
        aiPurpose:
          'Ic kayitlar icin yetkili workspace route; public AI kesfinden haric tutulur.',
      },
    },
  },
  authSettings: {
    path: '/settings',
    section: 'auth',
    robots: { index: false, follow: false },
    locale: {
      en: {
        title: 'Account settings',
        description:
          'Protected account-level settings for the Vantor application shell.',
        aiPurpose:
          'Authenticated settings route; excluded from indexing and AI discovery lists.',
      },
      tr: {
        title: 'Hesap ayarlari',
        description:
          'Vantor uygulama kabugu icin korumali hesap duzeyi ayarlar.',
        aiPurpose:
          'Yetkili ayarlar route; indeksleme ve AI kesif listelerinden haric tutulur.',
      },
    },
  },
  adminLogin: {
    path: '/admin/login',
    section: 'admin',
    robots: { index: false, follow: false },
    locale: {
      en: {
        title: 'Admin login',
        description:
          'Admin sign-in surface for management access to the Vantor shell.',
        aiPurpose:
          'Administrative login route; blocked from indexing and AI discovery.',
      },
      tr: {
        title: 'Admin girisi',
        description: 'Vantor kabugu yonetim erisimi icin admin giris yuzeyi.',
        aiPurpose:
          'Yonetim giris route; indeksleme ve AI kesfinden engellenir.',
      },
    },
  },
  adminOverview: {
    path: '/admin',
    section: 'admin',
    robots: { index: false, follow: false },
    locale: {
      en: {
        title: 'Management overview',
        description:
          'Protected management dashboard for users, settings, and Vantor status.',
        aiPurpose:
          'Protected admin overview route; not intended for public crawlers.',
      },
      tr: {
        title: 'Yonetim ozeti',
        description:
          'Kullanicilar, ayarlar ve Vantor durumu icin korumali yonetim dashboardu.',
        aiPurpose:
          'Korumali admin ozet route; public crawlerlar icin tasarlanmamistir.',
      },
    },
  },
  adminUsers: {
    path: '/admin/users',
    section: 'admin',
    robots: { index: false, follow: false },
    locale: {
      en: {
        title: 'Admin users',
        description:
          'Protected admin user roster for future identity integrations.',
        aiPurpose:
          'Protected admin users route; noindex because it models identity data.',
      },
      tr: {
        title: 'Admin kullanicilari',
        description:
          'Gelecekteki kimlik entegrasyonlari icin korumali admin kullanici listesi.',
        aiPurpose:
          'Kimlik verisini modelledigi icin noindex olan korumali admin kullanici route.',
      },
    },
  },
  adminSettings: {
    path: '/admin/settings',
    section: 'admin',
    robots: { index: false, follow: false },
    locale: {
      en: {
        title: 'Admin settings',
        description:
          'Protected configuration surface for Vantor-level controls.',
        aiPurpose:
          'Protected admin configuration route; blocked from indexing and AI discovery.',
      },
      tr: {
        title: 'Admin ayarlari',
        description:
          'Vantor duzeyi kontroller icin korumali yapilandirma yuzeyi.',
        aiPurpose:
          'Korumali admin yapilandirma route; indeksleme ve AI kesfinden engellenir.',
      },
    },
  },
} satisfies Record<MetadataRouteId, RouteMetadataDescriptor>;

function absoluteUrl(path: string): string {
  return new URL(path, siteMetadata.url).toString();
}

function isMetadataRouteId(
  route: MetadataRouteId | RouteMetadataInput,
): route is MetadataRouteId {
  return typeof route === 'string';
}

function humanizePath(path: string): string {
  const cleanPath = path.split('?')[0]?.replace(/^\/+|\/+$/g, '') ?? '';
  const lastSegment = cleanPath.split('/').filter(Boolean).at(-1);

  if (!lastSegment) return siteMetadata.name;

  return lastSegment
    .replace(/^\[+|\]+$/g, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function inferRouteSection(path: string): RouteSection {
  if (path === '/admin' || path.startsWith('/admin/')) return 'admin';
  if (path === '/home' || path === '/workspace' || path === '/settings') {
    return 'auth';
  }
  return 'public';
}

function inferRouteRobots(path: string, section: RouteSection): RouteRobots {
  if (section !== 'public') return { index: false, follow: false };
  if (path === '/login' || path.endsWith('/login')) {
    return { index: false, follow: false };
  }
  return { index: true, follow: true };
}

function toRouteDescriptor(input: RouteMetadataInput): RouteMetadataDescriptor {
  const section = input.section ?? inferRouteSection(input.path);
  const robots = input.robots ?? inferRouteRobots(input.path, section);
  const fallbackTitle = input.title ?? humanizePath(input.path);
  const fallbackDescription =
    input.description ??
    `${fallbackTitle} screen in the ${siteMetadata.name} application foundation.`;
  const fallbackAiPurpose =
    input.aiPurpose ??
    `${fallbackTitle} route generated from path-level metadata defaults.`;

  return {
    path: input.path,
    section,
    robots,
    locale: {
      en: {
        title: input.locale?.en?.title ?? fallbackTitle,
        description: input.locale?.en?.description ?? fallbackDescription,
        aiPurpose: input.locale?.en?.aiPurpose ?? fallbackAiPurpose,
      },
      tr: {
        title: input.locale?.tr?.title ?? fallbackTitle,
        description: input.locale?.tr?.description ?? fallbackDescription,
        aiPurpose: input.locale?.tr?.aiPurpose ?? fallbackAiPurpose,
      },
    },
  };
}

function resolveRouteDescriptor(route: MetadataRouteId | RouteMetadataInput) {
  return isMetadataRouteId(route)
    ? routeMetadata[route]
    : toRouteDescriptor(route);
}

export function getRouteMetadataDescriptor(routeId: MetadataRouteId) {
  return routeMetadata[routeId];
}

export function getIndexableRoutes() {
  return Object.values(routeMetadata).filter((route) => route.robots.index);
}

export function buildRootMetadata(
  locale: Locale = routing.defaultLocale,
): Metadata {
  const title =
    locale === 'tr'
      ? 'Vantor | Next.js Uygulama Temeli'
      : 'Vantor | Next.js Application Foundation';

  return {
    metadataBase: siteMetadata.url,
    applicationName: siteMetadata.name,
    title: {
      default: title,
      template: `%s | ${siteMetadata.name}`,
    },
    description: siteMetadata.description,
    keywords: [...siteMetadata.keywords],
    authors: [{ name: siteMetadata.creator, url: siteMetadata.url }],
    creator: siteMetadata.creator,
    publisher: siteMetadata.publisher,
    category: 'technology',
    classification: 'application template',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    manifest: '/manifest.webmanifest',
    icons: {
      icon: [
        {
          url: siteMetadata.assets.icon16,
          sizes: '16x16',
          type: 'image/png',
        },
        {
          url: siteMetadata.assets.icon32,
          sizes: '32x32',
          type: 'image/png',
        },
        {
          url: siteMetadata.assets.icon48,
          sizes: '48x48',
          type: 'image/png',
        },
      ],
      shortcut: [
        {
          url: siteMetadata.assets.shortcutIcon,
          sizes: '48x48',
          type: 'image/x-icon',
        },
      ],
      apple: [
        {
          url: siteMetadata.assets.appleTouchIcon,
          sizes: '180x180',
          type: 'image/png',
        },
      ],
      other: [
        {
          rel: 'mask-icon',
          url: siteMetadata.assets.icon48,
          color: '#5d5dff',
        },
      ],
    },
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      siteName: siteMetadata.name,
      title,
      description: siteMetadata.description,
      url: '/',
      images: [
        {
          url: siteMetadata.assets.openGraph,
          width: 1024,
          height: 1024,
          alt: `${siteMetadata.name} application template brand symbol`,
        },
      ],
      locale,
      alternateLocale: routing.locales.filter((item) => item !== locale),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: siteMetadata.description,
      images: [siteMetadata.assets.openGraph],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    other: {
      'ai:site_name': siteMetadata.name,
      'ai:summary': siteMetadata.aiSummary,
      'ai:llms-txt': absoluteUrl('/llms.txt'),
    },
  };
}

export function buildPageMetadata(
  route: MetadataRouteId | RouteMetadataInput,
  locale: Locale = routing.defaultLocale,
): Metadata {
  const descriptor = resolveRouteDescriptor(route);
  const localized = descriptor.locale[locale];
  const url = absoluteUrl(descriptor.path);
  const routeId = isMetadataRouteId(route) ? route : descriptor.path;

  return {
    title: localized.title,
    description: localized.description,
    alternates: {
      canonical: descriptor.path,
    },
    openGraph: {
      type: 'website',
      siteName: siteMetadata.name,
      title: localized.title,
      description: localized.description,
      url,
      images: [
        {
          url: siteMetadata.assets.openGraph,
          width: 1024,
          height: 1024,
          alt: `${siteMetadata.name} application template brand symbol`,
        },
      ],
      locale,
      alternateLocale: routing.locales.filter((item) => item !== locale),
    },
    twitter: {
      card: 'summary_large_image',
      title: localized.title,
      description: localized.description,
      images: [siteMetadata.assets.openGraph],
    },
    robots: {
      index: descriptor.robots.index,
      follow: descriptor.robots.follow,
      nocache: !descriptor.robots.index,
      googleBot: {
        index: descriptor.robots.index,
        follow: descriptor.robots.follow,
        noimageindex: !descriptor.robots.index,
        'max-image-preview': descriptor.robots.index ? 'large' : 'none',
        'max-snippet': descriptor.robots.index ? -1 : 0,
        'max-video-preview': descriptor.robots.index ? -1 : 0,
      },
    },
    other: {
      'ai:route_id': routeId,
      'ai:section': descriptor.section,
      'ai:purpose': localized.aiPurpose,
      'ai:indexable': String(descriptor.robots.index),
    },
  };
}

export function buildDynamicPageMetadata(
  input: DynamicRouteMetadataInput,
  locale: Locale = routing.defaultLocale,
): Metadata {
  const descriptor = toRouteDescriptor({
    ...input,
    path: input.canonicalPath ?? input.path,
  });
  const metadata = buildPageMetadata(descriptor, locale);
  const imageUrl = input.image ? absoluteUrl(input.image) : undefined;

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: input.publishedTime || input.modifiedTime ? 'article' : 'website',
      images: imageUrl ? [{ url: imageUrl }] : metadata.openGraph?.images,
      publishedTime: input.publishedTime,
      modifiedTime: input.modifiedTime,
    },
  };
}
