import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ok, err, requireAdmin } from '@/lib/api-helpers';
import { invalidatePublicData } from '@/lib/public-data';
import { ABOUT_CARD_DESCRIPTION_MAX_LENGTH } from '@/lib/content-limits';

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
    if (typeof body.message !== 'string' || !body.message.trim() || body.message.length > ABOUT_CARD_DESCRIPTION_MAX_LENGTH) {
      return err(`Message is required and must be ${ABOUT_CARD_DESCRIPTION_MAX_LENGTH} characters or fewer`);
    }
    const { displayPages, ...rest } = body;
    const item = await prisma.testimonial.create({ data: rest });
    invalidatePublicData('published-testimonials');
    return ok(item);
  } catch (e) {
    console.error('[POST /api/admin/testimonials]', e);
    return err((e as Error).message ?? 'Failed to create testimonial', 500);
  }
}
