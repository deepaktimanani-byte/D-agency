import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/site-url";
import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

const staticPages = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about-us", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/success-stories", changeFrequency: "weekly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/contact-us", changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-of-service", changeFrequency: "yearly", priority: 0.3 },
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, stories, posts] = await Promise.all([
    prisma.service.findMany({
      where: { status: "published" },
      select: { slug: true, updatedAt: true },
      orderBy: { slug: "asc" },
    }),
    prisma.successStory.findMany({
      where: { status: "published" },
      select: { slug: true, updatedAt: true },
      orderBy: { slug: "asc" },
    }),
    prisma.blogPost.findMany({
      where: { status: "published" },
      select: { slug: true, updatedAt: true },
      orderBy: { slug: "asc" },
    }),
  ]);

  return [
    ...staticPages.map(({ path, ...page }) => ({
      ...page,
      url: absoluteUrl(path),
    })),
    ...services.map((service) => ({
      url: absoluteUrl(`/services/${encodeURIComponent(service.slug)}`),
      lastModified: service.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...stories.map((story) => ({
      url: absoluteUrl(`/success-stories/${encodeURIComponent(story.slug)}`),
      lastModified: story.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${encodeURIComponent(post.slug)}`),
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
