import { ok, err } from '@/lib/api-helpers';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const items = await prisma.serviceCategory.findMany({ orderBy: { name: 'asc' } });
    return ok(items);
  } catch {
    return err('Failed to load categories', 500);
  }
}
