import { Event, Category, User, Rating } from '@/types';

export const mockUsers: User[] = [
  { id: 'u1', email: 'admin@tajrobe.ir', role: 'ADMIN', name: 'ادمین تجربه', createdAt: new Date().toISOString() },
  { id: 'u2', email: 'host@tajrobe.ir', role: 'USER', name: 'علی رضایی', createdAt: new Date().toISOString() },
  { id: 'u3', email: 'user@tajrobe.ir', role: 'USER', name: 'سارا احمدی', createdAt: new Date().toISOString() },
];

export const mockCategories: Category[] = [
  { id: 'c1', name: 'آموزشی و کارگاه', slug: 'آموزشی-و-کارگاه', isFallback: false },
  { id: 'c2', name: 'موسیقی و کنسرت', slug: 'موسیقی-و-کنسرت', isFallback: false },
  { id: 'c3', name: 'هنر و فرهنگ', slug: 'هنر-و-فرهنگ', isFallback: false },
  { id: 'c12', name: 'سایر', slug: 'سایر', isFallback: true },
];

export const mockEvents: Event[] = [
  {
    id: 'e1',
    title: 'کارگاه آموزش جامع Next.js 15',
    description: '<p>در این کارگاه با جدیدترین قابلیت‌های Next.js آشنا می‌شویم.</p>',
    bannerUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070',
    startDate: new Date(Date.now() + 86400000 * 5).toISOString(),
    endDate: new Date(Date.now() + 86400000 * 5 + 7200000).toISOString(),
    hasTime: true,
    price: 500000,
    mode: 'ONLINE',
    joinLink: 'https://meet.google.com/abc-defg-hij',
    status: 'PUBLISHED',
    hostId: 'u2',
    host: mockUsers[1],
    categoryId: 'c1',
    category: mockCategories[0],
    registrationCount: 15,
    averageRating: 4.8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'e2',
    title: 'کنسرت موسیقی سنتی ایرانی',
    description: '<p>شبی به‌یادماندنی با اجرای زنده موسیقی سنتی در فضای باز.</p>',
    bannerUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070',
    startDate: new Date(Date.now() + 86400000 * 10).toISOString(),
    endDate: new Date(Date.now() + 86400000 * 10 + 10800000).toISOString(),
    hasTime: true,
    price: 0,
    mode: 'IN_PERSON',
    location: 'تهران، فضای باز کاخ سعدآباد',
    status: 'PUBLISHED',
    hostId: 'u1',
    host: mockUsers[0],
    categoryId: 'c2',
    category: mockCategories[1],
    registrationCount: 120,
    averageRating: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export const mockRatings: Rating[] = [
  {
    id: 'r1',
    userId: 'u3',
    eventId: 'e1',
    score: 5,
    comment: 'عالی بود، خیلی چیزها یاد گرفتم.',
    user: mockUsers[2],
    createdAt: new Date().toISOString(),
  }
];

export const api = {
  getEvents: async () => mockEvents,
  getEvent: async (id: string) => mockEvents.find(e => e.id === id),
  getPopularEvents: async () => [...mockEvents].sort((a, b) => (b.registrationCount || 0) - (a.registrationCount || 0)),
  getCategories: async () => mockCategories,
  getRatings: async (eventId: string) => mockRatings.filter(r => r.eventId === eventId),
};
