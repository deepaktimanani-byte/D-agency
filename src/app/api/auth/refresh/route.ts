import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateTokens, verifyRefreshToken } from '@/lib/jwt';
import { ok, err } from '@/lib/api-helpers';

export async function POST(req: NextRequest) {
  try {
    const { refreshToken } = await req.json();
    if (!refreshToken) return err('Refresh token required');

    const payload = verifyRefreshToken(refreshToken);
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) return err('Invalid refresh token', 401);

    return ok(generateTokens(user.id, user.email));
  } catch {
    return err('Invalid refresh token', 401);
  }
}
