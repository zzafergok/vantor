import type { AuthHomeCopy } from '../types';

export const authHomeTr: AuthHomeCopy = {
  badge: 'Yetkili',
  title: 'Dashboard özeti',
  description:
    'Bu korumalı alan nötr örnek veriler kullanır; içeriği daha sonra herhangi bir iş domain’iyle değiştirebilirsiniz.',
  actionLabel: 'Örnek ekle',
  metrics: [
    { label: 'Örnek kayıtlar', value: '24', icon: 'boxes' },
    { label: 'Bekleyen öğeler', value: '08', icon: 'activity' },
    { label: 'Son güncelleme', value: 'Şimdi', icon: 'clock' },
  ],
};
