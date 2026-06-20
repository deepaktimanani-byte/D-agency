import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ok, err, requireAdmin } from '@/lib/api-helpers';

export async function GET(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const { searchParams } = req.nextUrl;
    const status = searchParams.get('status') ?? undefined;
    const page = parseInt(searchParams.get('page') ?? '1');
    const take = 20;
    const skip = (page - 1) * take;

    const [items, total] = await Promise.all([
      prisma.enquiry.findMany({
        where: status ? { status } : undefined,
        orderBy: { createdAt: 'desc' },
        take,
        skip,
      }),
      prisma.enquiry.count({ where: status ? { status } : undefined }),
    ]);

    return ok({ items, total, page, pages: Math.ceil(total / take) });
  } catch {
    return err('Failed to load enquiries', 500);
  }
}
