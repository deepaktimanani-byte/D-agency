import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ok, err, requireAdmin } from '@/lib/api-helpers';

export async function GET(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const [totalEnquiries, totalServices, publishedPosts, totalStories, newEnquiries, totalTeamMembers] = await Promise.all([
      prisma.enquiry.count(),
      prisma.service.count(),
      prisma.blogPost.count({ where: { status: 'published' } }),
      prisma.successStory.count(),
      prisma.enquiry.count({ where: { status: 'new' } }),
      prisma.teamMember.count(),
    ]);
    return ok({ totalEnquiries, totalServices, publishedPosts, totalStories, newEnquiries, totalTeamMembers });
  } catch {
    return err('Failed to load stats', 500);
  }
}
