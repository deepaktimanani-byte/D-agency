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
  if (items.length === 0) return null;

  return (
    <section className={`section-pad ${variant === "mint" ? "bg-bg-mint" : "bg-surface"}`}>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((post) => <BlogCard key={post.id} post={post} />)}
        </div>
      </div>
    </section>
  );
}
