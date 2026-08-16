import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'عدم دسترسی' }, { status: 403 });
    }

    const { name, slug } = await request.json();
    
    if (!name || !slug) {
      return NextResponse.json({ error: 'نام و اسلاگ الزامی است' }, { status: 400 });
    }

    const category = await prisma.category.create({
      data: { name, slug },
    });

    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error('Create Category Error:', error);
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}
