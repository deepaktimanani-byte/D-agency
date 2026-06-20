import { ok, err } from '@/lib/api-helpers';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const items = await prisma.teamMember.findMany({
      where: { status: 'published' },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    });
    return ok(items);
  } catch {
    return err('Failed to load team', 500);
  }
}
