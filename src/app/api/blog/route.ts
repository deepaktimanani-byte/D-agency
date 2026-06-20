import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ok, err } from '@/lib/api-helpers';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const category = searchParams.get('category') ?? undefined;
    const tag = searchParams.get('tag') ?? undefined;

    const items = await prisma.blogPost.findMany({
      where: {
        status: 'published',
        publishedAt: { lte: new Date() },
        ...(category && { category: { slug: category } }),
        ...(tag && { tags: { array_contains: tag } }),
      },
      include: { author: { select: { id: true, name: true, photo: true } }, category: true },
      orderBy: { publishedAt: 'desc' },
    });
    return ok(items);
  } catch {
    return err('Failed to load blog posts', 500);
  }
}
