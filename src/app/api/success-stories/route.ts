import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ok, err } from '@/lib/api-helpers';

export async function GET(req: NextRequest) {
  try {
    const industry = req.nextUrl.searchParams.get('industry') ?? undefined;
    const items = await prisma.successStory.findMany({
      where: { status: 'published', ...(industry && { industry }) },
      include: {
        results: { orderBy: { sortOrder: 'asc' } },
        services: { include: { service: { select: { id: true, title: true, slug: true } } } },
      },
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
    });
    return ok(items);
  } catch {
    return err('Failed to load stories', 500);
  }
}
