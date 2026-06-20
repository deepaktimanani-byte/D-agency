import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ok, err, requireAdmin, slugify } from '@/lib/api-helpers';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const { id } = await params;
    const item = await prisma.blogPost.findUnique({ where: { id }, include: { author: true, category: true } });
    if (!item) return err('Post not found', 404);
    return ok(item);
  } catch {
    return err('Failed to load post', 500);
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const { id } = await params;
    const body = await req.json();
    const { category, ...data } = body;
    const slug = data.slug || (data.title ? slugify(data.title) : undefined);
    const publishedAt = data.publishedAt !== undefined
      ? (data.publishedAt ? new Date(data.publishedAt) : null)
      : undefined;
    const item = await prisma.blogPost.update({
      where: { id },
      data: { ...data, ...(slug && { slug }), ...(publishedAt !== undefined && { publishedAt }) },
    });
    return ok(item);
  } catch (e) {
    console.error('[PUT /api/admin/blog/[id]]', e);
    return err((e as Error).message ?? 'Failed to update post', 500);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const { id } = await params;
    await prisma.blogPost.delete({ where: { id } });
    return ok({ deleted: true });
  } catch {
    return err('Failed to delete post', 500);
  }
}
