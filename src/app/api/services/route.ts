import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ok, err } from '@/lib/api-helpers';

export async function GET(req: NextRequest) {
  try {
    const category = req.nextUrl.searchParams.get('category') ?? undefined;
    const items = await prisma.service.findMany({
      where: {
        status: 'published',
        ...(category && { category: { slug: category } }),
      },
      include: { category: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
    return ok(items);
  } catch {
    return err('Failed to load services', 500);
  }
}
