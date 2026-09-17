import { revalidateTag, unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { SiteSettings } from "@/types";

const PUBLIC_REVALIDATE_SECONDS = 300;

export function invalidatePublicData(...tags: string[]) {
  for (const tag of tags) revalidateTag(tag, "max");
}

const settingsQuery = unstable_cache(
  async () => prisma.siteSetting.findMany(),
  ["public-site-settings"],
  { revalidate: PUBLIC_REVALIDATE_SECONDS, tags: ["public-site-settings"] }
);

export async function getPublicSettings(): Promise<Partial<SiteSettings>> {
  const rows = await settingsQuery();
  return rows.reduce<Partial<SiteSettings>>(
    (acc, row) => ({ ...acc, [row.key]: row.value }),
    {}
  );
}

export function getPublishedServices(categoryId?: string) {
  return unstable_cache(
    async () =>
      prisma.service.findMany({
        where: {
          status: "published",
          ...(categoryId ? { categoryId } : {}),
        },
        include: { category: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      }),
    ["published-services", categoryId ?? "all"],
    { revalidate: PUBLIC_REVALIDATE_SECONDS, tags: ["published-services"] }
  )();
}

export const getServiceCategories = unstable_cache(
  async () => prisma.serviceCategory.findMany({ orderBy: { name: "asc" } }),
  ["service-categories"],
  { revalidate: PUBLIC_REVALIDATE_SECONDS, tags: ["service-categories"] }
);

export const getPublishedStories = unstable_cache(
  async (industry?: string, category?: string) =>
    prisma.successStory.findMany({
      where: {
        status: "published",
        ...(industry ? { industry } : {}),
        ...(category ? { category: { name: category } } : {}),
      },
      include: { results: true, category: true },
      orderBy: { createdAt: "desc" },
    }),
  ["published-stories"],
  { revalidate: PUBLIC_REVALIDATE_SECONDS, tags: ["published-stories"] }
);

export const getHomepageStories = unstable_cache(
  async () =>
    prisma.successStory.findMany({
      where: { status: "published" },
      include: { results: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ["homepage-stories"],
  { revalidate: PUBLIC_REVALIDATE_SECONDS, tags: ["published-stories"] }
);

export const getPublishedClientLogos = unstable_cache(
  async () =>
    prisma.successStory.findMany({
      where: { status: "published", clientLogo: { not: null } },
      select: { id: true, clientName: true, clientLogo: true },
      orderBy: { createdAt: "asc" },
    }),
  ["published-client-logos"],
  { revalidate: PUBLIC_REVALIDATE_SECONDS, tags: ["published-stories"] }
);

export const getPublishedTestimonials = unstable_cache(
  async (page: string) =>
    prisma.testimonial.findMany({
      where: { status: "published", displayPage: { contains: page } },
      orderBy: { sortOrder: "asc" },
    }),
  ["published-testimonials"],
  { revalidate: PUBLIC_REVALIDATE_SECONDS, tags: ["published-testimonials"] }
);

export const getPublishedTeam = unstable_cache(
  async () =>
    prisma.teamMember.findMany({
      where: { status: "published" },
      orderBy: { sortOrder: "asc" },
    }),
  ["published-team"],
  { revalidate: PUBLIC_REVALIDATE_SECONDS, tags: ["published-team"] }
);

export const getPublishedBlogPosts = unstable_cache(
  async (category?: string) =>
    prisma.blogPost.findMany({
      where: {
        status: "published",
        ...(category ? { category: { slug: category } } : {}),
      },
      include: { category: true, author: true },
      orderBy: { publishedAt: "desc" },
    }),
  ["published-blog-posts"],
  { revalidate: PUBLIC_REVALIDATE_SECONDS, tags: ["published-blog-posts"] }
);

export const getHomepageBlogPosts = unstable_cache(
  async () =>
    prisma.blogPost.findMany({
      where: { status: "published" },
      include: { category: true, author: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
  ["homepage-blog-posts"],
  { revalidate: PUBLIC_REVALIDATE_SECONDS, tags: ["published-blog-posts"] }
);

export const getContactServices = unstable_cache(
  async () =>
    prisma.service.findMany({
      where: { status: "published" },
      select: { id: true, title: true },
      orderBy: { sortOrder: "asc" },
    }),
  ["contact-services"],
  { revalidate: PUBLIC_REVALIDATE_SECONDS, tags: ["published-services"] }
);

export const getServiceBySlug = unstable_cache(
  async (slug: string) =>
    prisma.service.findUnique({
      where: { slug, status: "published" },
      include: { category: true },
    }),
  ["published-service-by-slug"],
  { revalidate: PUBLIC_REVALIDATE_SECONDS, tags: ["published-services"] }
);

export const getRelatedServices = unstable_cache(
  async (excludeId: string) =>
    prisma.service.findMany({
      where: { status: "published", id: { not: excludeId } },
      include: { category: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      take: 3,
    }),
  ["related-services"],
  { revalidate: PUBLIC_REVALIDATE_SECONDS, tags: ["published-services"] }
);

export const getStoryBySlug = unstable_cache(
  async (slug: string) =>
    prisma.successStory.findUnique({
      where: { slug, status: "published" },
      include: { results: true, services: { include: { service: true } } },
    }),
  ["published-story-by-slug"],
  { revalidate: PUBLIC_REVALIDATE_SECONDS, tags: ["published-stories"] }
);

export const getRelatedStories = unstable_cache(
  async (excludeId: string) =>
    prisma.successStory.findMany({
      where: { status: "published", id: { not: excludeId } },
      include: { results: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ["related-stories"],
  { revalidate: PUBLIC_REVALIDATE_SECONDS, tags: ["published-stories"] }
);

export const getBlogPostBySlug = unstable_cache(
  async (slug: string) =>
    prisma.blogPost.findUnique({
      where: { slug, status: "published" },
      include: { category: true, author: true },
    }),
  ["published-blog-post-by-slug"],
  { revalidate: PUBLIC_REVALIDATE_SECONDS, tags: ["published-blog-posts"] }
);

export const getRelatedBlogPosts = unstable_cache(
  async (excludeId: string, categoryId?: string) =>
    prisma.blogPost.findMany({
      where: {
        status: "published",
        id: { not: excludeId },
        ...(categoryId ? { categoryId } : {}),
      },
      include: { category: true, author: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
  ["related-blog-posts"],
  { revalidate: PUBLIC_REVALIDATE_SECONDS, tags: ["published-blog-posts"] }
);
