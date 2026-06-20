export const dynamic = 'force-dynamic';

import { BlogCard } from "@/components/ui/BlogCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { prisma } from "@/lib/prisma";
import type { BlogCategory, BlogPost } from "@/types";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, strategies and guides from our team of digital, marketing, and technology experts. ",
};

async function getData(category?: string) {
  const posts = await prisma.blogPost.findMany({
    where: { status: "published", ...(category ? { category: { slug: category } } : {}) },
    include: { category: true, author: true },
    orderBy: { publishedAt: "desc" },
  });
  const uniqueCategories: BlogCategory[] = Array.from(
    new Map(posts.filter((p) => p.category).map((p) => [p.category!.id, p.category!])).values()
  );
  return { posts: posts as unknown as BlogPost[], categories: uniqueCategories };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: activeCategory } = await searchParams;
  const { posts, categories } = await getData(activeCategory);

  const featured = posts.find((p) => p.status === "published");
  const rest = posts.filter((p) => p !== featured);

  return (
    <>
      {/* Hero */}
      <section className="section-pad bg-bg-mint">
        <div className="container-main text-center max-w-2xl mx-auto">
          <SectionLabel align="center">Insights</SectionLabel>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-heading mb-4">
            Ideas That Move Businesses Forward
          </h1>
          <p className="text-body text-lg leading-relaxed">
            Strategy, tactics, and real-world lessons from our team of growth
            experts.
          </p>
        </div>
      </section>

      {/* Category filter */}
      {categories.length > 0 && (
        <section className="sticky top-16 z-10 bg-white border-b border-border-light">
          <div className="container-main">
            <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
              <Link
                href="/blog"
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  !activeCategory
                    ? "bg-navy text-white"
                    : "text-body hover:text-heading hover:bg-bg-mint"
                }`}
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/blog?category=${cat.slug}`}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                    activeCategory === cat.slug
                      ? "bg-navy text-white"
                      : "text-body hover:text-heading hover:bg-bg-mint"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Posts */}
      <section className="section-pad bg-white">
        <div className="container-main">
          {posts.length > 0 ? (
            <>
              {/* Featured post */}
              {featured && (
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 p-6 rounded-3xl border border-border-light hover:shadow-xl transition-all duration-300"
                >
                  <div className="rounded-2xl overflow-hidden aspect-video bg-bg-mint relative">
                    {featured.featuredImage ? (
                      <img
                        src={featured.featuredImage}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-navy/10 to-accent-teal/10" />
                    )}
                  </div>
                  <div className="flex flex-col justify-center gap-4">
                    {featured.category && (
                      <span className="text-xs font-semibold text-accent-teal bg-accent-teal/10 px-3 py-1 rounded-full w-fit">
                        {featured.category.name}
                      </span>
                    )}
                    <h2 className="text-2xl font-extrabold text-heading group-hover:text-navy transition-colors">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="text-body leading-relaxed line-clamp-3">{featured.excerpt}</p>
                    )}
                    <div className="flex items-center gap-3 text-sm text-muted">
                      {featured.author?.name && <span>{featured.author.name}</span>}
                      {featured.readTimeMinutes && (
                        <span>{featured.readTimeMinutes} min read</span>
                      )}
                    </div>
                  </div>
                </Link>
              )}
              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((post) => (
                  <BlogCard key={post.id} post={post as never} />
                ))}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PLACEHOLDER_POSTS.map((p) => (
                <div key={p.title} className="rounded-2xl border border-border-light bg-white overflow-hidden">
                  <div className="h-44 bg-gradient-to-br from-bg-mint to-accent-teal/10" />
                  <div className="p-5">
                    <span className="text-xs font-semibold text-accent-teal bg-accent-teal/10 px-3 py-1 rounded-full">{p.category}</span>
                    <h3 className="font-bold text-heading mt-3 mb-2 text-base leading-snug">{p.title}</h3>
                    <p className="text-muted text-xs">{p.read}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

const PLACEHOLDER_POSTS = [
  { title: "10 Digital Marketing Trends That Will Dominate in 2025", category: "Marketing", read: "6 min read" },
  { title: "How to Build a Scalable Tech Stack for Your Startup", category: "Technology", read: "8 min read" },
  { title: "The Ultimate Guide to Personal Branding for Founders", category: "Branding", read: "10 min read" },
  { title: "Why Most SEO Strategies Fail (And How to Fix Yours)", category: "SEO", read: "7 min read" },
  { title: "Compliance Essentials Every Growing Business Must Know", category: "Legal", read: "5 min read" },
  { title: "How to Hire Your First 10 Employees Without Burning Out", category: "Operations", read: "9 min read" },
];
