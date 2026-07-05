import { NextRequest, NextResponse } from 'next/server';

import { routing } from '@/i18n/routing';
import { hasAdminSession, hasUserSession } from '@/lib/auth/session';

const PUBLIC_ROUTES = new Set(['/', '/login']);
const AUTH_ENTRY = '/home';
const ADMIN_ENTRY = '/admin';
const ADMIN_LOGIN = '/admin/login';
const LOCALE_HEADER = 'X-NEXT-INTL-LOCALE';

function withLocaleHeader(request: NextRequest): NextResponse {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  const locale =
    cookieLocale &&
    (routing.locales as readonly string[]).includes(cookieLocale)
      ? cookieLocale
      : routing.defaultLocale;

  const headers = new Headers(request.headers);
  headers.set(LOCALE_HEADER, locale);

  return NextResponse.next({ request: { headers } });
}

function isStaticAsset(pathname: string): boolean {
  return (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/llms.txt'
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isStaticAsset(pathname) || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const hasSession = hasUserSession(request);
  const hasAdmin = hasAdminSession(request);
  const isPublicRoute = PUBLIC_ROUTES.has(pathname);
  const isAdminLogin = pathname === ADMIN_LOGIN;
  const isAdminRoute =
    pathname === ADMIN_ENTRY || pathname.startsWith(`${ADMIN_ENTRY}/`);

  if (isAdminLogin) {
    if (hasAdmin) {
      return NextResponse.redirect(new URL(ADMIN_ENTRY, request.url));
    }
    return withLocaleHeader(request);
  }

  if (isAdminRoute) {
    if (!hasAdmin) {
      return NextResponse.redirect(new URL(ADMIN_LOGIN, request.url));
    }
    return withLocaleHeader(request);
  }

  if (isPublicRoute) {
    if (hasSession) {
      return NextResponse.redirect(new URL(AUTH_ENTRY, request.url));
    }
    return withLocaleHeader(request);
  }

  if (!hasSession) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return withLocaleHeader(request);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
