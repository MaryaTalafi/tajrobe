import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) return NextResponse.json({ error: 'تجربه یافت نشد' }, { status: 404 });

    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(event.description || '');
    const location = encodeURIComponent(event.location || event.joinLink || '');
    
    const formatGoogleDate = (date: Date) => date.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const startStr = formatGoogleDate(event.startDate);
    const endStr = formatGoogleDate(event.endDate);

    if (type === 'google') {
      const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startStr}/${endStr}&details=${details}&location=${location}`;
      return NextResponse.redirect(googleUrl);
    } 
    
    if (type === 'ics') {
      const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Tajrobe App//IR
BEGIN:VEVENT
UID:${event.id}@tajrobe.app
DTSTAMP:${formatGoogleDate(new Date())}
DTSTART:${startStr}
DTEND:${endStr}
SUMMARY:${event.title}
DESCRIPTION:${event.description || ''}
LOCATION:${event.location || event.joinLink || ''}
END:VEVENT
END:VCALENDAR`;

      return new NextResponse(icsData, {
        headers: {
          'Content-Type': 'text/calendar',
          'Content-Disposition': `attachment; filename="event-${event.id}.ics"`,
        },
      });
    }

    return NextResponse.json({ error: 'نوع نامعتبر است. از google یا ics استفاده کنید.' }, { status: 400 });
  } catch (error) {
    console.error('Calendar Error:', error);
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}
