import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import { createSession } from '@/lib/session';

export async function POST(request: Request) {
  try {
    const { email, code, rememberMe = false } = await request.json();

    if (!email || !code) {
      return NextResponse.json({ error: 'ایمیل و کد الزامی است' }, { status: 400 });
    }

    const codeHash = crypto.createHash('sha256').update(code).digest('hex');

    // Find valid OTP record
    const otpRecord = await prisma.otpCode.findFirst({
      where: {
        email,
        codeHash,
        consumed: false,
        expiresAt: {
          gt: new Date(), // must not be expired
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!otpRecord) {
      return NextResponse.json({ error: 'کد نامعتبر یا منقضی شده است' }, { status: 401 });
    }

    // Mark as consumed
    await prisma.otpCode.update({
      where: { id: otpRecord.id },
      data: { consumed: true },
    });

    // Find or create user
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({ data: { email } });
    }

    // Create Redis session and issue Cookie
    await createSession(user.id, user.role, rememberMe);

    return NextResponse.json({ success: true, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error('OTP Verify Error:', error);
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}
