import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'احراز هویت الزامی است' }, { status: 401 });

    const eventId = id;
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) return NextResponse.json({ error: 'تجربه یافت نشد' }, { status: 404 });

    // Check if already registered
    const existing = await prisma.registration.findUnique({
      where: {
        userId_eventId: {
          userId: session.userId,
          eventId,
        },
      },
    });

    if (existing) {
      return NextResponse.json({ error: 'شما قبلاً در این تجربه ثبت‌نام کرده‌اید' }, { status: 400 });
    }

    const registration = await prisma.registration.create({
      data: {
        userId: session.userId,
        eventId,
      },
    });

    // In a real app, send confirmation email here

    return NextResponse.json({ success: true, registration });
  } catch (error) {
    console.error('Register Event Error:', error);
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}
