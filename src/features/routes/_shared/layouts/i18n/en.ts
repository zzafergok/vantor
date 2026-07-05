import type { ShellCopy } from '../types';

export const shellEn: ShellCopy = {
  brand: {
    title: 'Vantor',
    subtitle: 'Premium application shell',
  },
  publicNav: [
    { href: '/', label: 'Public', icon: 'boxes' },
    { href: '/login', label: 'Login', icon: 'login' },
  ],
  authNav: [
    { href: '/home', label: 'Home', icon: 'home' },
    { href: '/workspace', label: 'Items', icon: 'wrench' },
    { href: '/settings', label: 'Settings', icon: 'settings' },
  ],
  adminNav: [
    { href: '/admin', label: 'Overview', icon: 'shield' },
    { href: '/admin/users', label: 'Users', icon: 'users' },
    { href: '/admin/settings', label: 'Settings', icon: 'settings' },
  ],
  authHeader: {
    title: 'Auth Area',
    subtitle: 'Protected application area',
  },
  adminHeader: {
    title: 'Admin Area',
    subtitle: 'Management control area',
    manageLabel: 'Manage',
  },
};
