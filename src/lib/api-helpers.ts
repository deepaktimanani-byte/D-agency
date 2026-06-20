import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from './jwt';

export function ok(data: unknown, message?: string) {
  return NextResponse.json({ success: true, data, message });
}

export function err(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

export function requireAdmin(req: NextRequest): NextResponse | null {
  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return err('Unauthorized', 401);
  try {
    verifyAccessToken(auth.slice(7));
    return null;
  } catch {
    return err('Unauthorized', 401);
  }
}

export function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
