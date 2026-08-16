import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'ایمیل نامعتبر است' }, { status: 400 });
    }

    // Rate Limiting: Max 3 requests per 10 minutes per email
    const rlKey = `rate-limit:otp:${email}`;
    const requests = await redis.incr(rlKey);
    if (requests === 1) {
      await redis.expire(rlKey, 600); // 10 minutes
    }
    if (requests > 3) {
      return NextResponse.json({ error: 'درخواست بیش از حد. لطفاً ۱۰ دقیقه دیگر تلاش کنید.' }, { status: 429 });
    }

    // Generate 6 digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Hash it
    const codeHash = crypto.createHash('sha256').update(otpCode).digest('hex');

    // Store in Postgres (expires in 5 minutes)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    
    await prisma.otpCode.create({
      data: {
        email,
        codeHash,
        expiresAt,
      },
    });

    // In a real app, send the email here using Resend/SendGrid
    console.log(`[DEV ONLY] OTP Code for ${email} is: ${otpCode}`);

    return NextResponse.json({ success: true, message: 'کد تایید ارسال شد' });
  } catch (error) {
    console.error('OTP Request Error:', error);
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}
