import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ok, err, requireAdmin } from '@/lib/api-helpers';

export async function GET(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const items = await prisma.testimonial.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
    return ok(items);
  } catch {
    return err('Failed to load testimonials', 500);
  }
}

export async function POST(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const body = await req.json();
    const { displayPages, ...rest } = body;
    const item = await prisma.testimonial.create({ data: rest });
    return ok(item);
  } catch (e) {
    console.error('[POST /api/admin/testimonials]', e);
    return err((e as Error).message ?? 'Failed to create testimonial', 500);
  }
}
