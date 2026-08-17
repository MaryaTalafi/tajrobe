import { cookies } from 'next/headers';
import { redis } from '@/lib/redis';
import crypto from 'crypto';

export type SessionPayload = {
  userId: string;
  role: string;
};

const SESSION_COOKIE_NAME = 'tajrobe_session';

export async function createSession(userId: string, role: string, rememberMe: boolean) {
  const sessionId = crypto.randomBytes(32).toString('hex');
  const sessionData: SessionPayload = { userId, role };
  
  // Expiry configuration
  // Remember me: 30 days
  // Not remember me: 24 hours (Redis), Session cookie (Browser)
  const expiresInSeconds = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60;
  
  // Store session in Redis
  await redis.set(`session:${sessionId}`, JSON.stringify(sessionData), { ex: expiresInSeconds });

  // Set HTTP-Only Cookie
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    ...(rememberMe && { maxAge: expiresInSeconds }), // If not remember me, it's a session cookie (no maxAge)
  });

  return sessionId;
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  
  if (!sessionId) return null;

  const sessionStr = await redis.get<string | null>(`session:${sessionId}`);
  if (!sessionStr) return null;

  try {
    return typeof sessionStr === 'string' ? JSON.parse(sessionStr) : sessionStr;
  } catch {
    return null;
  }
}

export async function clearSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  
  if (sessionId) {
    await redis.del(`session:${sessionId}`);
  }
  
  cookieStore.delete(SESSION_COOKIE_NAME);
}
