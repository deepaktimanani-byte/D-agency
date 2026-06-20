import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ok, err, requireAdmin } from '@/lib/api-helpers';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  try {
    const { id } = await params;
    const { name, slug } = await req.json();
    const item = await prisma.serviceCategory.update({
      where: { id },
      data: { name, slug: slug || name.toLowerCase().replace(/\s+/g, '-') },
    });
    return ok(item);
  } catch {
    return err('Failed to update category', 500);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  try {
    const { id } = await params;
    await prisma.serviceCategory.delete({ where: { id } });
    return ok({ deleted: true });
  } catch {
    return err('Failed to delete category', 500);
  }
}
