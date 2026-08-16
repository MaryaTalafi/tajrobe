import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const categoryId = searchParams.get('category');
    const mode = searchParams.get('mode');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 12;

    const where: any = { status: 'PUBLISHED' };

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }
    if (categoryId) where.categoryId = categoryId;
    if (mode) where.mode = mode;
    
    if (minPrice !== null || maxPrice !== null) {
      where.price = {};
      if (minPrice) where.price.gte = parseInt(minPrice);
      if (maxPrice) where.price.lte = parseInt(maxPrice);
    }

    if (dateFrom || dateTo) {
      where.startDate = {};
      if (dateFrom) where.startDate.gte = new Date(dateFrom);
      if (dateTo) where.startDate.lte = new Date(dateTo);
    }

    const events = await prisma.event.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { startDate: 'asc' },
      include: {
        category: true,
        host: { select: { name: true, email: true } },
        _count: { select: { registrations: true } },
      },
    });

    const total = await prisma.event.count({ where });

    return NextResponse.json({
      success: true,
      data: events,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('List Events Error:', error);
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'احراز هویت الزامی است' }, { status: 401 });
    }

    const body = await request.json();
    
    // Minimal validation
    if (!body.title || !body.categoryId || !body.bannerUrl || !body.startDate || !body.endDate || !body.mode) {
      return NextResponse.json({ error: 'اطلاعات ناقص است' }, { status: 400 });
    }

    const event = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description || '',
        bannerUrl: body.bannerUrl,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        hasTime: body.hasTime || false,
        price: body.price ? parseInt(body.price) : null,
        mode: body.mode,
        location: body.location || null,
        joinLink: body.joinLink || null,
        recordingUrl: body.recordingUrl || null,
        status: body.status || 'DRAFT',
        hostId: session.userId,
        categoryId: body.categoryId,
      },
    });

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error('Create Event Error:', error);
    return NextResponse.json({ error: 'خطای سرور در ایجاد تجربه' }, { status: 500 });
  }
}
