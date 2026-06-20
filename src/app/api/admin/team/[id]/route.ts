import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ok, err, requireAdmin } from '@/lib/api-helpers';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const { id } = await params;
    const body = await req.json();
    const item = await prisma.teamMember.update({ where: { id }, data: body });
    return ok(item);
  } catch {
    return err('Failed to update team member', 500);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const { id } = await params;
    await prisma.teamMember.delete({ where: { id } });
    return ok({ deleted: true });
  } catch {
    return err('Failed to delete team member', 500);
  }
}
