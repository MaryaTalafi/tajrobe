import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const popularEvents = await prisma.event.findMany({
      where: {
        status: 'PUBLISHED',
      },
      orderBy: {
        registrations: {
          _count: 'desc',
        },
      },
      take: 6,
      include: {
        category: true,
        host: {
          select: { name: true, email: true },
        },
        _count: {
          select: { registrations: true },
        },
      },
    });

    return NextResponse.json({ success: true, events: popularEvents });
  } catch (error) {
    console.error('Popular Events Error:', error);
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}
