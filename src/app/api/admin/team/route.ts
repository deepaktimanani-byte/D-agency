import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ok, err, requireAdmin } from '@/lib/api-helpers';

export async function GET(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const items = await prisma.teamMember.findMany({ orderBy: [{ sortOrder: 'asc' }] });
    return ok(items);
  } catch {
    return err('Failed to load team', 500);
  }
}

export async function POST(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const body = await req.json();
    const item = await prisma.teamMember.create({ data: body });
    return ok(item);
  } catch {
    return err('Failed to create team member', 500);
  }
}
