export const dynamic = 'force-dynamic';

import { BlogHighlights } from "@/components/sections/BlogHighlights";
import { FaqSection } from "@/components/sections/FaqSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { LeadCaptureCta } from "@/components/sections/LeadCaptureCta";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { StatsSection } from "@/components/sections/StatsSection";
import { SuccessStoriesHighlight } from "@/components/sections/SuccessStoriesHighlight";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { prisma } from "@/lib/prisma";
import type { SiteSettings } from "@/types";

async function fetchHomeData() {
  const [settingsRows, services, stories, testimonials, posts] = await Promise.all([
    prisma.siteSetting.findMany(),
    prisma.service.findMany({
      where: { status: "published" },
      include: { category: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
    prisma.successStory.findMany({
      where: { status: "published" },
      include: { results: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    prisma.testimonial.findMany({
      where: { status: "published", displayPage: { contains: "home" } },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.blogPost.findMany({
      where: { status: "published" },
      include: { category: true, author: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
  ]);

  const settings = settingsRows.reduce<Partial<SiteSettings>>(
    (acc, row) => ({ ...acc, [row.key]: row.value }),
    {}
  );

  return { settings, services, stories, testimonials, posts };
}

export default async function HomePage() {
  const { settings, services, stories, testimonials, posts } = await fetchHomeData();

  const hasStats = [
    settings.stat_1_value,
    settings.stat_2_value,
    settings.stat_3_value,
    settings.stat_4_value,
  ].some((v) => v && v.trim() !== "");

  // Compute alternating white/mint for every light section that will actually render.
  // Dark sections (StatsSection, LeadCaptureCta) are excluded — they're always dark.
  const visibleLight = [
    services.length > 0 && "services",
    "whychooseus",
    stories.length > 0 && "stories",
    testimonials.length > 0 && "testimonials",
    posts.length > 0 && "blog",
    "faq",
  ].filter(Boolean) as string[];

  const v = (key: string): "white" | "mint" =>
    visibleLight.indexOf(key) % 2 === 0 ? "white" : "mint";

  return (
    <>
      <HeroSection settings={settings} />
      <TrustBar />
      {services.length > 0 && <ServicesGrid services={services as never} variant={v("services")} />}
      {hasStats && <StatsSection settings={settings} />}
      <WhyChooseUs variant={v("whychooseus")} />
      {stories.length > 0 && <SuccessStoriesHighlight stories={stories as never} variant={v("stories")} />}
      {testimonials.length > 0 && <TestimonialsCarousel testimonials={testimonials as never} variant={v("testimonials")} />}
      {posts.length > 0 && <BlogHighlights posts={posts as never} variant={v("blog")} />}
      <FaqSection variant={v("faq")} />
      <LeadCaptureCta services={services as never} />
    </>
  );
}
