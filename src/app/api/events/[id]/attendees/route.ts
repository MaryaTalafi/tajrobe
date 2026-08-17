import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'احراز هویت الزامی است' }, { status: 401 });

    const eventId = id;
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) return NextResponse.json({ error: 'تجربه یافت نشد' }, { status: 404 });

    // Host or Admin
    if (event.hostId !== session.userId && session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'عدم دسترسی' }, { status: 403 });
    }

    const attendees = await prisma.registration.findMany({
      where: { eventId },
      include: {
        user: { select: { id: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, attendees });
  } catch (error) {
    console.error('Get Attendees Error:', error);
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}
