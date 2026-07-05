import type { NextRequest } from 'next/server';

export const SESSION_COOKIE = 'session';
export const ADMIN_SESSION_COOKIE = 'admin_session';

function readCookie(request: NextRequest, name: string): string | null {
  const value = request.cookies.get(name)?.value;
  return value && value.trim().length > 0 ? value : null;
}

export function hasUserSession(request: NextRequest): boolean {
  return Boolean(readCookie(request, SESSION_COOKIE));
}

export function hasAdminSession(request: NextRequest): boolean {
  return Boolean(readCookie(request, ADMIN_SESSION_COOKIE));
}
