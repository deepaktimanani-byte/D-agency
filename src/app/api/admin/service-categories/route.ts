import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ok, err, requireAdmin } from '@/lib/api-helpers';

export async function GET(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  try {
    const items = await prisma.serviceCategory.findMany({ orderBy: { name: 'asc' } });
    return ok(items);
  } catch {
    return err('Failed to load categories', 500);
  }
}

export async function POST(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  try {
    const { name, slug } = await req.json();
    const item = await prisma.serviceCategory.create({
      data: { name, slug: slug || name.toLowerCase().replace(/\s+/g, '-') },
    });
    return ok(item);
  } catch {
    return err('Failed to create category', 500);
  }
}
