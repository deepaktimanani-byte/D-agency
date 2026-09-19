import {
  getPublishedBlogPosts,
  getPublishedServices,
  getPublishedStories,
} from "@/lib/public-data";
import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fixyourgap.com";

function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
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
    getPublishedServices(),
    getPublishedStories(),
    getPublishedBlogPosts(),
  ]);

  return [
    ...staticPages.map(({ path, ...page }) => ({
      ...page,
      url: absoluteUrl(path),
    })),
    ...services.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      lastModified: service.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...stories.map((story) => ({
      url: absoluteUrl(`/success-stories/${story.slug}`),
      lastModified: story.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
