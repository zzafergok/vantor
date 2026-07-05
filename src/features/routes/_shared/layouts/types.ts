import type { LucideIcon } from 'lucide-react';

export type ShellNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type ShellCopy = {
  brand: {
    title: string;
    subtitle: string;
  };
  publicNav: Array<Omit<ShellNavItem, 'icon'> & { icon: 'boxes' | 'login' }>;
  authNav: Array<
    Omit<ShellNavItem, 'icon'> & { icon: 'home' | 'wrench' | 'settings' }
  >;
  adminNav: Array<
    Omit<ShellNavItem, 'icon'> & { icon: 'shield' | 'users' | 'settings' }
  >;
  authHeader: {
    title: string;
    subtitle: string;
  };
  adminHeader: {
    title: string;
    subtitle: string;
    manageLabel: string;
  };
};
