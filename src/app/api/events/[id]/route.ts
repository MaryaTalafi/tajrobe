import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  try {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        category: true,
        host: { select: { id: true, email: true } },
        _count: { select: { registrations: true, favorites: true } },
      },
    });

    if (!event) {
      return NextResponse.json({ error: 'تجربه یافت نشد' }, { status: 404 });
    }

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error('Get Event Error:', error);
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'احراز هویت الزامی است' }, { status: 401 });

    const event = await prisma.event.findUnique({ where: { id } });
    
    if (!event) return NextResponse.json({ error: 'تجربه یافت نشد' }, { status: 404 });
    if (event.hostId !== session.userId) {
      return NextResponse.json({ error: 'عدم دسترسی' }, { status: 403 });
    }

    const body = await request.json();
    // Update fields conditionally
    const dataToUpdate: any = {};
    if (body.title) dataToUpdate.title = body.title;
    if (body.description) dataToUpdate.description = body.description;
    if (body.bannerUrl) dataToUpdate.bannerUrl = body.bannerUrl;
    if (body.startDate) dataToUpdate.startDate = new Date(body.startDate);
    if (body.endDate) dataToUpdate.endDate = new Date(body.endDate);
    if (typeof body.hasTime === 'boolean') dataToUpdate.hasTime = body.hasTime;
    if (body.price !== undefined) dataToUpdate.price = body.price ? parseInt(body.price) : null;
    if (body.mode) dataToUpdate.mode = body.mode;
    if (body.location !== undefined) dataToUpdate.location = body.location;
    if (body.joinLink !== undefined) dataToUpdate.joinLink = body.joinLink;
    if (body.recordingUrl !== undefined) dataToUpdate.recordingUrl = body.recordingUrl;
    if (body.status) dataToUpdate.status = body.status;
    if (body.categoryId) dataToUpdate.categoryId = body.categoryId;

    const updated = await prisma.event.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json({ success: true, event: updated });
  } catch (error) {
    console.error('Update Event Error:', error);
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'احراز هویت الزامی است' }, { status: 401 });

    const event = await prisma.event.findUnique({ where: { id } });
    
    if (!event) return NextResponse.json({ error: 'تجربه یافت نشد' }, { status: 404 });
    
    // Admin or Host can delete
    if (event.hostId !== session.userId && session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'عدم دسترسی' }, { status: 403 });
    }

    await prisma.event.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'تجربه حذف شد' });
  } catch (error) {
    console.error('Delete Event Error:', error);
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}
