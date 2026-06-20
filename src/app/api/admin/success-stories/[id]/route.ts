import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ok, err, requireAdmin, slugify } from '@/lib/api-helpers';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const { id } = await params;
    const item = await prisma.successStory.findUnique({
      where: { id },
      include: { results: { orderBy: { sortOrder: 'asc' } }, services: { include: { service: true } } },
    });
    if (!item) return err('Story not found', 404);
    return ok(item);
  } catch {
    return err('Failed to load story', 500);
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const { id } = await params;
    const body = await req.json();
    const { results, serviceIds, categoryId, ...data } = body;
    const slug = data.slug || (data.title ? slugify(data.title) : undefined);

    const item = await prisma.$transaction(async (tx) => {
      if (results !== undefined) await tx.successStoryResult.deleteMany({ where: { storyId: id } });
      if (serviceIds !== undefined) await tx.successStoryService.deleteMany({ where: { storyId: id } });
      return tx.successStory.update({
        where: { id },
        data: {
          ...data,
          ...(slug && { slug }),
          categoryId: categoryId || null,
          ...(results && { results: { create: results } }),
          ...(serviceIds && { services: { create: serviceIds.map((sid: string) => ({ serviceId: sid })) } }),
        },
        include: { results: true, category: true, services: { include: { service: true } } },
      });
    });
    return ok(item);
  } catch {
    return err('Failed to update story', 500);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const { id } = await params;
    await prisma.successStory.delete({ where: { id } });
    return ok({ deleted: true });
  } catch {
    return err('Failed to delete story', 500);
  }
}
