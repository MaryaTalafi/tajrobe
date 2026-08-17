import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'عدم دسترسی' }, { status: 403 });
    }

    const [totalUsers, totalEvents, totalRegistrations, recentEvents] = await Promise.all([
      prisma.user.count(),
      prisma.event.count(),
      prisma.registration.count(),
      prisma.event.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { host: { select: { email: true } } },
      }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        totalEvents,
        totalRegistrations,
      },
      recentEvents,
    });
  } catch (error) {
    console.error('Admin Stats Error:', error);
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}
