export const dynamic = 'force-dynamic';

import { BlogCard } from "@/components/ui/BlogCard";
import { LeadCaptureCta } from "@/components/sections/LeadCaptureCta";
import { prisma } from "@/lib/prisma";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";
import { Clock } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const p = await prisma.blogPost.findUnique({ where: { slug } });
  if (!p) return { title: "Blog Post" };
  return {
    title: p.metaTitle || p.title,
    description: p.metaDescription || p.excerpt,
    openGraph: { type: "article", images: p.featuredImage ? [p.featuredImage] : [] },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const [raw, allRaw] = await Promise.all([
    prisma.blogPost.findUnique({ where: { slug, status: "published" }, include: { category: true, author: true } }),
    prisma.blogPost.findMany({ where: { status: "published" }, include: { category: true, author: true }, orderBy: { publishedAt: "desc" } }),
  ]);

  if (!raw) notFound();

  const post = raw as unknown as BlogPost;
  const related = (allRaw as unknown as BlogPost[])
    .filter((p) => p.id !== post.id && p.category?.id === post.category?.id)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="section-pad bg-bg-mint">
        <div className="container-main max-w-3xl mx-auto">
          {post.category && (
            <Link
              href={`/blog?category=${post.category.slug}`}
              className="inline-block text-xs font-semibold text-accent-teal bg-accent-teal/10 px-3 py-1 rounded-full mb-5 hover:bg-accent-teal/20 transition-colors"
            >
              {post.category.name}
            </Link>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-heading mb-5 leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-body text-lg leading-relaxed mb-6">{post.excerpt}</p>
          )}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted border-t border-border-light pt-5">
            {post.author && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-navy/10">
                  {post.author.photo ? (
                    <Image
                      src={post.author.photo}
                      alt={post.author.name}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-xs font-bold text-navy">
                        {post.author.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-heading text-xs">{post.author.name}</p>
                  {post.author.designation && (
                    <p className="text-muted text-xs">{post.author.designation}</p>
                  )}
                </div>
              </div>
            )}
            {post.publishedAt && (
              <span>{formatDate(post.publishedAt)}</span>
            )}
            {post.readTimeMinutes && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTimeMinutes} min read
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Featured image */}
      {post.featuredImage && (
        <div className="container-main max-w-4xl">
          <div className="rounded-3xl overflow-hidden aspect-video relative -mt-4">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Content */}
      <section className="section-pad bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Article body */}
            <article className="lg:col-span-3">
              <div
                className="prose prose-lg max-w-none
                  prose-headings:font-extrabold prose-headings:text-heading
                  prose-p:text-body prose-p:leading-relaxed
                  prose-a:text-navy prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-heading
                  prose-li:text-body
                  prose-blockquote:border-accent-teal prose-blockquote:text-body"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-border-light">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium bg-bg-mint text-body px-3 py-1.5 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="flex flex-col gap-6">
              {post.author && (
                <div className="p-5 rounded-2xl border border-border-light bg-white">
                  <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">
                    About the Author
                  </p>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-navy/10 flex-shrink-0">
                      {post.author.photo ? (
                        <Image
                          src={post.author.photo}
                          alt={post.author.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="font-bold text-navy">{post.author.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-heading text-sm">{post.author.name}</p>
                      {post.author.designation && (
                        <p className="text-muted text-xs">{post.author.designation}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="p-5 rounded-2xl bg-navy text-white">
                <h3 className="font-bold mb-2">Ready to grow?</h3>
                <p className="text-white/70 text-sm mb-4 leading-relaxed">
                  Book a free consultation with our team.
                </p>
                <Link
                  href="/contact-us"
                  className="block text-center text-sm font-semibold bg-accent-teal text-white px-4 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                >
                  Get in Touch
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="section-pad bg-bg-mint">
          <div className="container-main">
            <h2 className="text-2xl font-extrabold text-heading mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => <BlogCard key={p.id} post={p} />)}
            </div>
          </div>
        </section>
      )}

      <LeadCaptureCta />
    </>
  );
}
