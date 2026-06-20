import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ok, err, requireAdmin, slugify } from '@/lib/api-helpers';

export async function GET(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const status = req.nextUrl.searchParams.get('status') ?? undefined;
    const items = await prisma.successStory.findMany({
      where: status ? { status } : undefined,
      include: { results: true, category: true },
      orderBy: { createdAt: 'desc' },
    });
    return ok(items);
  } catch {
    return err('Failed to load stories', 500);
  }
}

export async function POST(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const body = await req.json();
    const { results, serviceIds, categoryId, ...data } = body;
    const slug = data.slug || slugify(data.title);
    const item = await prisma.successStory.create({
      data: {
        ...data,
        slug,
        gallery: data.gallery ?? [],
        categoryId: categoryId || null,
        results: results ? { create: results } : undefined,
        services: serviceIds ? { create: serviceIds.map((sid: string) => ({ serviceId: sid })) } : undefined,
      },
      include: { results: true, category: true, services: { include: { service: true } } },
    });
    return ok(item);
  } catch (e) {
    console.error('[POST /api/admin/success-stories]', e);
    return err((e as Error).message ?? 'Failed to create story', 500);
  }
}
