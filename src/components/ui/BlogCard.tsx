import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";
import { Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./Badge";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col bg-white rounded-2xl border border-border-light overflow-hidden",
        "hover:shadow-lg hover:-translate-y-1 transition-all duration-300",
        className
      )}
    >
      {/* Featured image */}
      <div className="relative h-44 bg-bg-mint overflow-hidden">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-navy/10 to-accent-teal/10" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        {post.category && (
          <Badge variant="teal">{post.category.name}</Badge>
        )}
        <h3 className="font-bold text-base leading-snug group-hover:text-navy transition-colors line-clamp-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-body text-sm leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between text-xs text-muted">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readTimeMinutes} min read
          </div>
          {post.publishedAt && (
            <span>{formatDate(post.publishedAt)}</span>
          )}
        </div>
        <div className="flex items-center gap-1 text-sm font-semibold text-navy group-hover:gap-2 transition-all">
          Read More <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
