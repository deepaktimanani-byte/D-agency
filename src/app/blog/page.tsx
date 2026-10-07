export const revalidate = 300;

import { BlogCard } from "@/components/ui/BlogCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getPublishedBlogPosts } from "@/lib/public-data";
import { socialMetadata } from "@/lib/social-metadata";
import type { BlogCategory, BlogPost } from "@/types";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, strategies and guides from our team of digital, marketing, and technology experts. ",
  ...socialMetadata({
    title: "Blog | Fix Your Gap",
    description: "Insights, strategies and guides from our team of digital, marketing, and technology experts.",
    path: "/blog",
  }),
};

async function getData(category?: string) {
  const allPosts = await getPublishedBlogPosts();
  const uniqueCategories: BlogCategory[] = Array.from(
    new Map(allPosts.filter((p) => p.category).map((p) => [p.category!.id, p.category!])).values()
  );
  const posts = category
    ? allPosts.filter((post) => post.category?.slug === category)
    : allPosts;
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
        <section className="sticky top-16 z-10 bg-surface border-b border-border-light">
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
                  href={`/blog?category=${encodeURIComponent(cat.slug)}`}
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
      <section className="section-pad bg-surface">
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
                      <Image
                        src={featured.featuredImage}
                        alt={featured.title}
                        width={960}
                        height={540}
                        sizes="(max-width: 768px) 100vw, 50vw"
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
            <div className="rounded-3xl border border-border-light bg-bg-mint px-6 py-16 text-center">
              <h2 className="text-xl font-bold text-heading">
                {activeCategory ? "No posts in this category yet." : "No blog posts have been published yet."}
              </h2>
              {activeCategory && (
                <Link href="/blog" className="mt-4 inline-block font-semibold text-navy underline">
                  View all posts
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
