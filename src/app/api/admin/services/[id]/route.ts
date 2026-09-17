import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ok, err, requireAdmin, slugify } from '@/lib/api-helpers';
import { invalidatePublicData } from '@/lib/public-data';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const { id } = await params;
    const item = await prisma.service.findUnique({ where: { id }, include: { category: true } });
    if (!item) return err('Service not found', 404);
    return ok(item);
  } catch {
    return err('Failed to load service', 500);
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const { id } = await params;
    const body = await req.json();
    const slug = body.slug || (body.title ? slugify(body.title) : undefined);
    const item = await prisma.service.update({
      where: { id },
      data: { ...body, ...(slug && { slug }) },
    });
    invalidatePublicData('published-services');
    return ok(item);
  } catch {
    return err('Failed to update service', 500);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const { id } = await params;
    await prisma.service.delete({ where: { id } });
    invalidatePublicData('published-services');
    return ok({ deleted: true });
  } catch {
    return err('Failed to delete service', 500);
  }
}
