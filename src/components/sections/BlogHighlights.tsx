import { Button } from "@/components/ui/Button";
import { BlogCard } from "@/components/ui/BlogCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { BlogPost } from "@/types";
import Link from "next/link";

interface BlogHighlightsProps {
  posts: BlogPost[];
  variant?: "white" | "mint";
}

export function BlogHighlights({ posts, variant = "white" }: BlogHighlightsProps) {
  const items = posts.slice(0, 3);

  return (
    <section className={`section-pad ${variant === "mint" ? "bg-bg-mint" : "bg-white"}`}>
      <div className="container-main">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <SectionLabel>Insights</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-heading">
              Latest from Our Blog
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/blog">View All Posts</Link>
          </Button>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((post) => <BlogCard key={post.id} post={post} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLACEHOLDER_POSTS.map((p) => (
              <div key={p.title} className="rounded-2xl border border-border-light bg-white overflow-hidden">
                <div className="h-44 bg-gradient-to-br from-bg-mint to-accent-teal/10" />
                <div className="p-5">
                  <span className="text-xs font-semibold text-accent-teal bg-accent-teal/10 px-3 py-1 rounded-full">{p.category}</span>
                  <h3 className="font-bold text-heading mt-3 mb-2 text-base leading-snug">{p.title}</h3>
                  <p className="text-body text-sm">Read More →</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

const PLACEHOLDER_POSTS = [
  { title: "10 Digital Marketing Trends That Will Dominate in 2025", category: "Marketing" },
  { title: "How to Build a Scalable Tech Stack for Your Startup", category: "Technology" },
  { title: "The Ultimate Guide to Personal Branding for Founders", category: "Branding" },
];
