import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ok, err, requireAdmin, slugify } from '@/lib/api-helpers';

export async function GET(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const status = req.nextUrl.searchParams.get('status') ?? undefined;
    const items = await prisma.service.findMany({
      where: status ? { status } : undefined,
      include: { category: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
    return ok(items);
  } catch {
    return err('Failed to load services', 500);
  }
}

export async function POST(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const body = await req.json();
    const slug = body.slug || slugify(body.title);
    const item = await prisma.service.create({
      data: { ...body, slug, features: body.features ?? [], processSteps: body.processSteps ?? [] },
    });
    return ok(item);
  } catch {
    return err('Failed to create service', 500);
  }
}
