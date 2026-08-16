import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'احراز هویت الزامی است' }, { status: 401 });

    const favorites = await prisma.favorite.findMany({
      where: { userId: session.userId },
      include: {
        event: {
          include: {
            category: true,
            host: { select: { name: true, email: true } },
            _count: { select: { registrations: true } }
          }
        }
      },
      orderBy: { id: 'desc' }
    });

    return NextResponse.json({ success: true, favorites });
  } catch (error) {
    console.error('Get Favorites Error:', error);
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}
