import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ok, err } from '@/lib/api-helpers';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const item = await prisma.blogPost.findFirst({
      where: { slug, status: 'published' },
      include: {
        author: { select: { id: true, name: true, photo: true, designation: true } },
        category: true,
      },
    });
    if (!item) return err('Post not found', 404);
    return ok(item);
  } catch {
    return err('Failed to load post', 500);
  }
}
