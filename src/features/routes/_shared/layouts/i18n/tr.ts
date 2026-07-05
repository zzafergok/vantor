import type { ShellCopy } from '../types';

export const shellTr: ShellCopy = {
  brand: {
    title: 'Vantor',
    subtitle: 'Premium uygulama kabuğu',
  },
  publicNav: [
    { href: '/', label: 'Public', icon: 'boxes' },
    { href: '/login', label: 'Giriş', icon: 'login' },
  ],
  authNav: [
    { href: '/home', label: 'Ana sayfa', icon: 'home' },
    { href: '/workspace', label: 'Öğeler', icon: 'wrench' },
    { href: '/settings', label: 'Ayarlar', icon: 'settings' },
  ],
  adminNav: [
    { href: '/admin', label: 'Özet', icon: 'shield' },
    { href: '/admin/users', label: 'Kullanıcılar', icon: 'users' },
    { href: '/admin/settings', label: 'Ayarlar', icon: 'settings' },
  ],
  authHeader: {
    title: 'Auth Alanı',
    subtitle: 'Korumalı uygulama alanı',
  },
  adminHeader: {
    title: 'Admin Alanı',
    subtitle: 'Yönetim kontrol alanı',
    manageLabel: 'Yönet',
  },
};
