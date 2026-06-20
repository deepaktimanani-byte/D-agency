import { LeadCaptureCta } from "@/components/sections/LeadCaptureCta";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StoryCard } from "@/components/ui/StoryCard";
import { prisma } from "@/lib/prisma";
import type { SuccessStory } from "@/types";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Success Stories",
  description: "Real results for real businesses. Explore how we've helped clients grow revenue, traffic, and brand equity.",
};

const INDUSTRIES = ["SaaS", "E-Commerce", "Retail", "Healthcare", "Finance", "Real Estate", "Education"];

async function getData(industry?: string, category?: string) {
  const stories = await prisma.successStory.findMany({
    where: {
      status: "published",
      ...(industry ? { industry } : {}),
      ...(category ? { category: { name: category } } : {}),
    },
    include: { results: true, category: true },
    orderBy: { createdAt: "desc" },
  });
  return stories as unknown as SuccessStory[];
}

export default async function SuccessStoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ industry?: string; category?: string }>;
}) {
  const { industry: activeIndustry, category: activeCategory } = await searchParams;

  const [stories, serviceCategories] = await Promise.all([
    getData(activeIndustry, activeCategory),
    prisma.serviceCategory.findMany({ orderBy: { name: "asc" } }),
  ]);

  const activeFilter = activeIndustry
    ? { type: "industry", value: activeIndustry }
    : activeCategory
    ? { type: "category", value: activeCategory }
    : null;

  return (
    <>
      {/* Hero */}
      <section className="section-pad bg-navy text-white">
        <div className="container-main text-center max-w-2xl mx-auto">
          <SectionLabel align="center">
            <span className="text-accent-teal">Our Work</span>
          </SectionLabel>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Success Stories</h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Numbers don&apos;t lie. Here&apos;s what happens when great strategy meets flawless execution.
          </p>
        </div>
      </section>

      {/* Combined filter bar */}
      <section className="sticky top-16 z-10 bg-white border-b border-border-light">
        <div className="container-main">
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
            {/* All */}
            <Link
              href="/success-stories"
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                !activeFilter ? "bg-navy text-white" : "text-body hover:text-heading hover:bg-bg-mint"
              }`}
            >
              All
            </Link>

            {/* Industry separator */}
            {INDUSTRIES.length > 0 && (
              <span className="flex-shrink-0 text-xs text-muted font-semibold uppercase tracking-wider px-1">Industry</span>
            )}
            {INDUSTRIES.map((ind) => (
              <Link
                key={ind}
                href={`/success-stories?industry=${encodeURIComponent(ind)}`}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  activeFilter?.type === "industry" && activeFilter.value === ind
                    ? "bg-navy text-white"
                    : "text-body hover:text-heading hover:bg-bg-mint"
                }`}
              >
                {ind}
              </Link>
            ))}

            {/* Service category separator */}
            {serviceCategories.length > 0 && (
              <span className="flex-shrink-0 text-xs text-muted font-semibold uppercase tracking-wider px-1">Service</span>
            )}
            {serviceCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/success-stories?category=${encodeURIComponent(cat.name)}`}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  activeFilter?.type === "category" && activeFilter.value === cat.name
                    ? "bg-accent-teal text-white"
                    : "text-body hover:text-heading hover:bg-bg-mint"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-pad bg-white">
        <div className="container-main">
          {stories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story) => (
                <StoryCard key={story.id} story={story as never} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-body text-lg mb-3">No stories found for this filter.</p>
              <Link href="/success-stories" className="text-navy font-semibold underline">View all stories</Link>
            </div>
          )}
        </div>
      </section>

      <LeadCaptureCta />
    </>
  );
}
