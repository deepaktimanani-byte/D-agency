import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ok, err, requireAdmin } from '@/lib/api-helpers';

export async function GET(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const settings = await prisma.siteSetting.findMany();
    return ok(Object.fromEntries(settings.map((s) => [s.key, s.value])));
  } catch {
    return err('Failed to load settings', 500);
  }
}

export async function PUT(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const data: Record<string, string> = await req.json();
    await Promise.all(
      Object.entries(data).map(([key, value]) =>
        prisma.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        })
      )
    );
    const all = await prisma.siteSetting.findMany();
    return ok(Object.fromEntries(all.map((s) => [s.key, s.value])));
  } catch {
    return err('Failed to update settings', 500);
  }
}
