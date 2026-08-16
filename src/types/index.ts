export type Role = 'ADMIN' | 'USER';
export type EventMode = 'ONLINE' | 'IN_PERSON' | 'OFFLINE_RECORDED';
export type EventStatus = 'DRAFT' | 'PUBLISHED' | 'UNPUBLISHED';

export interface User {
  id: string;
  email: string;
  role: Role;
  createdAt: string;
  name?: string;
  avatarUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  isFallback: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  bannerUrl: string;
  startDate: string;
  endDate: string;
  hasTime: boolean;
  price: number | null; // null/0 == free
  mode: EventMode;
  location?: string; // IN_PERSON
  joinLink?: string; // ONLINE
  recordingUrl?: string; // OFFLINE_RECORDED
  status: EventStatus;
  hostId: string;
  host?: User;
  categoryId: string;
  category?: Category;
  registrationCount?: number;
  averageRating?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Rating {
  id: string;
  userId: string;
  eventId: string;
  score: number; // 1-5
  comment?: string;
  user?: User;
  createdAt: string;
}
