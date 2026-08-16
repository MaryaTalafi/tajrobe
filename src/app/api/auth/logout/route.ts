import { NextResponse } from 'next/server';
import { clearSession } from '@/lib/session';

export async function POST() {
  try {
    await clearSession();
    return NextResponse.json({ success: true, message: 'با موفقیت خارج شدید' });
  } catch (error) {
    console.error('Logout Error:', error);
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}
