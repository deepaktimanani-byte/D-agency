import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ok, err, requireAdmin, slugify } from '@/lib/api-helpers';

export async function GET(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const status = req.nextUrl.searchParams.get('status') ?? undefined;
    const items = await prisma.blogPost.findMany({
      where: status ? { status } : undefined,
      include: { author: { select: { id: true, name: true } }, category: true },
      orderBy: { createdAt: 'desc' },
    });
    return ok(items);
  } catch {
    return err('Failed to load blog posts', 500);
  }
}

export async function POST(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const body = await req.json();
    const { category, ...data } = body;
    const slug = data.slug || slugify(data.title);
    const publishedAt = data.status === 'published' && !data.publishedAt
      ? new Date()
      : data.publishedAt ? new Date(data.publishedAt) : null;
    const item = await prisma.blogPost.create({
      data: { ...data, slug, tags: data.tags ?? [], publishedAt },
    });
    return ok(item);
  } catch {
    return err('Failed to create blog post', 500);
  }
}
