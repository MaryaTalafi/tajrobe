import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id: eventId } = await params;
    
    // Ratings are public
    const ratings = await prisma.rating.findMany({
      where: { eventId },
      include: {
        user: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, ratings });
  } catch (error) {
    console.error('Get Ratings Error:', error);
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'احراز هویت الزامی است' }, { status: 401 });

    const { id: eventId } = await params;
    const body = await request.json();

    if (!body.score || body.score < 1 || body.score > 5) {
      return NextResponse.json({ error: 'امتیاز نامعتبر است' }, { status: 400 });
    }

    // Must be registered to rate
    const registration = await prisma.registration.findUnique({
      where: {
        userId_eventId: {
          userId: session.userId,
          eventId,
        },
      },
    });

    if (!registration) {
      return NextResponse.json({ error: 'تنها شرکت‌کنندگان می‌توانند نظر ثبت کنند' }, { status: 403 });
    }

    // Upsert rating
    const rating = await prisma.rating.upsert({
      where: {
        userId_eventId: {
          userId: session.userId,
          eventId,
        },
      },
      update: {
        score: body.score,
        comment: body.comment || null,
      },
      create: {
        userId: session.userId,
        eventId,
        score: body.score,
        comment: body.comment || null,
      },
    });

    return NextResponse.json({ success: true, rating });
  } catch (error) {
    console.error('Post Rating Error:', error);
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}
