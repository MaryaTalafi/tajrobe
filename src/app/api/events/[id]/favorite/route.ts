import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'احراز هویت الزامی است' }, { status: 401 });

    const { id: eventId } = await params;
    
    // Check if event exists
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) return NextResponse.json({ error: 'تجربه یافت نشد' }, { status: 404 });

    // Check if already favorited
    const existing = await prisma.favorite.findUnique({
      where: {
        userId_eventId: {
          userId: session.userId,
          eventId,
        },
      },
    });

    if (existing) {
      // Toggle off
      await prisma.favorite.delete({ where: { id: existing.id } });
      return NextResponse.json({ success: true, favorited: false });
    } else {
      // Toggle on
      await prisma.favorite.create({
        data: {
          userId: session.userId,
          eventId,
        },
      });
      return NextResponse.json({ success: true, favorited: true });
    }
  } catch (error) {
    console.error('Toggle Favorite Error:', error);
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}
