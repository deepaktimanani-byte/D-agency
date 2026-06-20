import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ok, err, requireAdmin } from '@/lib/api-helpers';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const { id } = await params;
    const body = await req.json();
    const { displayPages, ...rest } = body;
    const item = await prisma.testimonial.update({ where: { id }, data: rest });
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
    return ok({ deleted: true });
  } catch {
    return err('Failed to delete testimonial', 500);
  }
}
