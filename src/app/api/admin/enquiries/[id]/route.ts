import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ok, err, requireAdmin } from '@/lib/api-helpers';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const { id } = await params;
    const enquiry = await prisma.enquiry.findUnique({ where: { id } });
    if (!enquiry) return err('Enquiry not found', 404);
    return ok(enquiry);
  } catch {
    return err('Failed to load enquiry', 500);
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const { id } = await params;
    const data = await req.json();
    const enquiry = await prisma.enquiry.update({ where: { id }, data });
    return ok(enquiry);
  } catch {
    return err('Failed to update enquiry', 500);
  }
}
