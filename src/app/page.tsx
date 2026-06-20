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

  return (
    <>
      <HeroSection settings={settings} />
      <TrustBar />
      <ServicesGrid services={services as never} />
      <StatsSection settings={settings} />
      <WhyChooseUs />
      <SuccessStoriesHighlight stories={stories as never} />
      <TestimonialsCarousel testimonials={testimonials as never} />
      <BlogHighlights posts={posts as never} />
      <FaqSection />
      <LeadCaptureCta services={services as never} />
    </>
  );
}
