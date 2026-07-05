import type { AdminUsersCopy } from '../types';

export const adminUsersEn: AdminUsersCopy = {
  title: 'Users',
  description: 'Dummy roster for future identity integrations.',
  cardTitle: 'Access list',
  users: [
    { name: 'Alex Morgan', role: 'Owner', status: 'Active' },
    { name: 'Jamie Lee', role: 'Admin', status: 'Invited' },
    { name: 'Taylor Kim', role: 'Member', status: 'Active' },
  ],
};
