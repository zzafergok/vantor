import type { AdminOverviewCopy } from '../types';

export const adminOverviewTr: AdminOverviewCopy = {
  title: 'Yönetim özeti',
  description:
    'Örnek kullanıcılar, ayarlar ve Vantor durumu için genel yönetim dashboard’u.',
  cards: [
    { label: 'Vantor durumu', value: 'Hazır', icon: 'activity' },
    { label: 'Erişim seviyesi', value: 'Admin', icon: 'shieldCheck' },
    { label: 'Örnek veri', value: 'Yüklü', icon: 'database' },
  ],
};
