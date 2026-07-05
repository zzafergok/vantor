import type { AdminOverviewCopy } from '../types';

export const adminOverviewEn: AdminOverviewCopy = {
  title: 'Management overview',
  description:
    'Generic management dashboard for sample users, settings, and Vantor status.',
  cards: [
    { label: 'Vantor status', value: 'Ready', icon: 'activity' },
    { label: 'Access level', value: 'Admin', icon: 'shieldCheck' },
    { label: 'Sample data', value: 'Loaded', icon: 'database' },
  ],
};
