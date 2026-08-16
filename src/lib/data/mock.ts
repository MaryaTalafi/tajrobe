import { prisma } from '@/lib/prisma';
import { Event, Category, User, Rating } from '@/types';

// We keep the types matching what the frontend expects, mapping Prisma outputs where needed.

export const api = {
  getEvents: async () => {
    try {
      const events = await prisma.event.findMany({
        where: { status: 'PUBLISHED' },
        orderBy: { startDate: 'asc' },
        include: {
          category: true,
          host: true,
          _count: { select: { registrations: true } }
        }
      });
      return events.map(e => ({
        ...e,
        registrationCount: e._count.registrations,
        startDate: e.startDate.toISOString(),
        endDate: e.endDate.toISOString(),
        createdAt: e.createdAt.toISOString(),
        updatedAt: e.updatedAt.toISOString(),
      }));
    } catch (e) {
      console.warn("DB not connected, returning empty events.");
      return [];
    }
  },
  
  getEvent: async (id: string) => {
    try {
      const e = await prisma.event.findUnique({
        where: { id },
        include: {
          category: true,
          host: true,
          _count: { select: { registrations: true } }
        }
      });
      if (!e) return null;
      return {
        ...e,
        registrationCount: e._count.registrations,
        startDate: e.startDate.toISOString(),
        endDate: e.endDate.toISOString(),
        createdAt: e.createdAt.toISOString(),
        updatedAt: e.updatedAt.toISOString(),
      };
    } catch (e) {
      return null;
    }
  },
  
  getPopularEvents: async () => {
    try {
      const events = await prisma.event.findMany({
        where: { status: 'PUBLISHED' },
        orderBy: { registrations: { _count: 'desc' } },
        take: 6,
        include: {
          category: true,
          host: true,
          _count: { select: { registrations: true } }
        }
      });
      return events.map(e => ({
        ...e,
        registrationCount: e._count.registrations,
        startDate: e.startDate.toISOString(),
        endDate: e.endDate.toISOString(),
        createdAt: e.createdAt.toISOString(),
        updatedAt: e.updatedAt.toISOString(),
      }));
    } catch (e) {
      console.warn("DB not connected, returning empty popular events.");
      return [];
    }
  },
  
  getCategories: async () => {
    try {
      return await prisma.category.findMany({ orderBy: { id: 'asc' } });
    } catch (e) {
      return [];
    }
  },
  
  getRatings: async (eventId: string) => {
    try {
      const ratings = await prisma.rating.findMany({
        where: { eventId },
        include: { user: true },
        orderBy: { createdAt: 'desc' }
      });
      return ratings.map(r => ({
        ...r,
        createdAt: r.createdAt.toISOString(),
        updatedAt: r.updatedAt.toISOString(),
      }));
    } catch (e) {
      return [];
    }
  },
};
