import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'عدم دسترسی' }, { status: 403 });
    }

    const { id } = await params;
    
    // Find category to delete
    const categoryToDelete = await prisma.category.findUnique({ where: { id } });
    if (!categoryToDelete) {
      return NextResponse.json({ error: 'دسته‌بندی یافت نشد' }, { status: 404 });
    }

    if (categoryToDelete.isFallback) {
      return NextResponse.json({ error: 'نمی‌توان دسته‌بندی پیش‌فرض (سایر) را حذف کرد' }, { status: 400 });
    }

    // Find fallback category
    const fallbackCategory = await prisma.category.findFirst({
      where: { isFallback: true },
    });

    if (!fallbackCategory) {
      return NextResponse.json({ error: 'دسته‌بندی پیش‌فرض یافت نشد' }, { status: 500 });
    }

    // Run transaction: reassign events -> delete category
    await prisma.$transaction([
      prisma.event.updateMany({
        where: { categoryId: id },
        data: { categoryId: fallbackCategory.id },
      }),
      prisma.category.delete({
        where: { id },
      }),
    ]);

    return NextResponse.json({ success: true, message: 'دسته‌بندی حذف شد و رویدادهای آن به دسته‌بندی سایر منتقل شدند' });
  } catch (error) {
    console.error('Delete Category Error:', error);
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}
