import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ok, err, requireAdmin } from '@/lib/api-helpers';
import { invalidatePublicData } from '@/lib/public-data';
import { ABOUT_CARD_DESCRIPTION_MAX_LENGTH } from '@/lib/content-limits';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const { id } = await params;
    const body = await req.json();
    if (typeof body.message !== 'string' || !body.message.trim() || body.message.length > ABOUT_CARD_DESCRIPTION_MAX_LENGTH) {
      return err(`Message is required and must be ${ABOUT_CARD_DESCRIPTION_MAX_LENGTH} characters or fewer`);
    }
    const { displayPages, ...rest } = body;
    const item = await prisma.testimonial.update({ where: { id }, data: rest });
    invalidatePublicData('published-testimonials');
    return ok(item);
  } catch (e) {
    console.error('[PUT /api/admin/testimonials/[id]]', e);
    return err((e as Error).message ?? 'Failed to update testimonial', 500);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const { id } = await params;
    await prisma.testimonial.delete({ where: { id } });
    invalidatePublicData('published-testimonials');
    return ok({ deleted: true });
  } catch {
    return err('Failed to delete testimonial', 500);
  }
}
