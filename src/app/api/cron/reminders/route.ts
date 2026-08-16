import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  try {
    // Check cron secret (Vercel standard)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Find events starting in exactly 1 hour
    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
    const windowStart = new Date(oneHourFromNow.getTime() - 5 * 60 * 1000); // 5 min buffer
    const windowEnd = new Date(oneHourFromNow.getTime() + 5 * 60 * 1000);

    const upcomingEvents = await prisma.event.findMany({
      where: {
        startDate: {
          gte: windowStart,
          lte: windowEnd,
        },
        status: 'PUBLISHED',
      },
      include: {
        registrations: {
          include: {
            user: true,
          },
        },
      },
    });

    let emailsSent = 0;

    for (const event of upcomingEvents) {
      for (const reg of event.registrations) {
        // Send email
        if (reg.user.email) {
          await resend.emails.send({
            from: 'Tajrobe <noreply@tajrobe.app>', // Replace with verified domain
            to: reg.user.email,
            subject: `یادآوری: تجربه "${event.title}" تا یک ساعت دیگر آغاز می‌شود!`,
            html: `<p>سلام!</p><p>یادآوری می‌کنیم که تجربه <strong>${event.title}</strong> به زودی آغاز می‌شود.</p><p><a href="https://tajrobe.app/events/${event.id}">ورود به صفحه تجربه</a></p>`,
          });
          emailsSent++;
        }
      }
    }

    return NextResponse.json({ success: true, processedEvents: upcomingEvents.length, emailsSent });
  } catch (error) {
    console.error('Cron Error:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
