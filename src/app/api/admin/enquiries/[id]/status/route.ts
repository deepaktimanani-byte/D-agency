import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ok, err, requireAdmin } from '@/lib/api-helpers';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const { id } = await params;
    const { status } = await req.json();
    if (!status) return err('Status is required');
    const enquiry = await prisma.enquiry.update({ where: { id }, data: { status } });
    return ok(enquiry);
  } catch {
    return err('Failed to update status', 500);
  }
}
