import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'احراز هویت انجام نشده است' }, { status: 401 });
    }
    
    return NextResponse.json({ success: true, user: session });
  } catch (error) {
    console.error('Get Me Error:', error);
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}
