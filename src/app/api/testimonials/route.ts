import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ok, err } from '@/lib/api-helpers';

export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get('page') ?? undefined;
    const items = await prisma.testimonial.findMany({
      where: { status: 'published', ...(page && { displayPage: page }) },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
    return ok(items);
  } catch {
    return err('Failed to load testimonials', 500);
  }
}
