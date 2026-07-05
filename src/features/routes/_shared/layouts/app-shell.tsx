import Image from 'next/image';
import Link from 'next/link';
import {
  Boxes,
  Home,
  LayoutDashboard,
  LogIn,
  Settings,
  Shield,
  Users,
  Wrench,
} from 'lucide-react';

import { Button } from '@/components/core/button';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { cn } from '@/lib/utils';
import { getCurrentLocale } from '@/lib/i18n/server-locale';
import { siteMetadata } from '@/lib/metadata/site-metadata';
import { getShellCopy } from './i18n';
import type { ShellCopy } from './types';
import type { ShellNavItem } from './types';

const navIcons = {
  boxes: Boxes,
  home: Home,
  login: LogIn,
  settings: Settings,
  shield: Shield,
  users: Users,
  wrench: Wrench,
} as const;

function mapNavItems(
  items: ReturnType<typeof getShellCopy>['publicNav'],
): ShellNavItem[];
function mapNavItems(
  items: ReturnType<typeof getShellCopy>['authNav'],
): ShellNavItem[];
function mapNavItems(
  items: ReturnType<typeof getShellCopy>['adminNav'],
): ShellNavItem[];
function mapNavItems(
  items: Array<{
    href: string;
    label: string;
    icon: keyof typeof navIcons;
  }>,
): ShellNavItem[] {
  return items.map((item) => ({
    href: item.href,
    label: item.label,
    icon: navIcons[item.icon],
  }));
}

export function BrandMark({
  compact = false,
  copy,
}: {
  compact?: boolean;
  copy: ShellCopy['brand'];
}) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-sm border border-arcly-blue/40 bg-void-black">
        <Image
          src={siteMetadata.assets.logo}
          alt={`${copy.title} brand mark`}
          width={36}
          height={36}
          className="h-full w-full object-cover"
          priority
        />
      </span>
      {!compact && (
        <span>
          <span className="block font-mono text-[10px] font-black uppercase tracking-widest text-ash">
            {copy.title}
          </span>
          <span className="block text-xs text-ash/70">
            {copy.subtitle}
          </span>
        </span>
      )}
    </Link>
  );
}

function ShellNav({
  items,
  direction = 'row',
}: {
  items: ShellNavItem[];
  direction?: 'row' | 'column';
}) {
  return (
    <nav
      className={cn(
        'flex gap-2',
        direction === 'column' ? 'flex-col' : 'items-center',
      )}
    >
      {items.map((item) => (
        <Button
          key={item.href}
          asChild
          variant="ghost"
          size="sm"
          className={cn(
            'rounded-none text-[11px] font-bold uppercase tracking-widest text-ash hover:text-titanium',
            direction === 'column' && 'justify-start',
          )}
        >
          <Link href={item.href}>
            <item.icon className="mr-2 h-3.5 w-3.5" />
            {item.label}
          </Link>
        </Button>
      ))}
    </nav>
  );
}

function ShellControls() {
  return (
    <div className="flex items-center gap-1">
      <ThemeToggle />
      <LanguageSwitcher />
    </div>
  );
}

export async function PublicShell({ children }: { children: React.ReactNode }) {
  const locale = await getCurrentLocale();
  const copy = getShellCopy(locale);

  return (
    <div className="min-h-screen bg-void-black text-titanium">
      <header className="sticky top-0 z-40 border-b border-gunmetal bg-void-black/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <BrandMark copy={copy.brand} />
          <div className="flex items-center gap-3">
            <ShellNav items={mapNavItems(copy.publicNav)} />
            <ShellControls />
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}

export async function AuthShell({ children }: { children: React.ReactNode }) {
  const locale = await getCurrentLocale();
  const copy = getShellCopy(locale);

  return (
    <div className="flex min-h-screen bg-void-black text-titanium">
      <aside className="hidden w-72 shrink-0 border-r border-gunmetal bg-obsidian lg:flex lg:flex-col">
        <div className="border-b border-gunmetal p-5">
          <BrandMark copy={copy.brand} />
        </div>
        <div className="flex-1 p-3">
          <ShellNav items={mapNavItems(copy.authNav)} direction="column" />
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-gunmetal bg-obsidian px-5 lg:px-8">
          <div className="lg:hidden">
            <BrandMark compact copy={copy.brand} />
          </div>
          <div className="hidden lg:block">
            <p className="font-mono text-[10px] font-black uppercase tracking-widest text-ash">
              {copy.authHeader.title}
            </p>
            <p className="text-sm text-titanium">{copy.authHeader.subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <ShellNav items={mapNavItems(copy.authNav)} />
            <ShellControls />
          </div>
        </header>
        <main className="min-w-0 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

export async function AdminShell({ children }: { children: React.ReactNode }) {
  const locale = await getCurrentLocale();
  const copy = getShellCopy(locale);

  return (
    <div className="flex min-h-screen bg-void-black text-titanium">
      <aside className="hidden w-72 shrink-0 border-r border-gunmetal bg-obsidian md:flex md:flex-col">
        <div className="border-b border-gunmetal p-5">
          <BrandMark copy={copy.brand} />
        </div>
        <div className="flex-1 p-3">
          <ShellNav items={mapNavItems(copy.adminNav)} direction="column" />
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-gunmetal bg-obsidian px-5 lg:px-8">
          <div>
            <p className="font-mono text-[10px] font-black uppercase tracking-widest text-ash">
              {copy.adminHeader.title}
            </p>
            <p className="text-sm text-titanium">
              {copy.adminHeader.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ShellControls />
            <Button asChild size="sm" variant="outline" className="rounded-none">
              <Link href="/admin/settings">
                <LayoutDashboard className="mr-2 h-3.5 w-3.5" />
                {copy.adminHeader.manageLabel}
              </Link>
            </Button>
          </div>
        </header>
        <main className="min-w-0 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
