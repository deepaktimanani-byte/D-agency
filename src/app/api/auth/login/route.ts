import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { generateTokens } from '@/lib/jwt';
import { ok, err } from '@/lib/api-helpers';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return err('Email and password are required');

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return err('Invalid credentials', 401);

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return err('Invalid credentials', 401);

    return ok(generateTokens(user.id, user.email));
  } catch {
    return err('Login failed', 500);
  }
}
