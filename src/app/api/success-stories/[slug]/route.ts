import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ok, err } from '@/lib/api-helpers';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const item = await prisma.successStory.findFirst({
      where: { slug, status: 'published' },
      include: {
        results: { orderBy: { sortOrder: 'asc' } },
        services: { include: { service: true } },
      },
    });
    if (!item) return err('Story not found', 404);
    return ok(item);
  } catch {
    return err('Failed to load story', 500);
  }
}
