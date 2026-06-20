import { cn } from "@/lib/utils";
import type { SuccessStory } from "@/types";
import { ArrowRight, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./Badge";

interface StoryCardProps {
  story: SuccessStory;
  className?: string;
}

export function StoryCard({ story, className }: StoryCardProps) {
  const topResult = story.results?.[0];
  const coverImg = story.gallery?.[0];

  return (
    <Link
      href={`/success-stories/${story.slug}`}
      className={cn(
        "group flex flex-col bg-white rounded-2xl border border-border-light overflow-hidden",
        "hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
        className
      )}
    >
      {/* Banner */}
      <div className="relative h-48 overflow-hidden">
        {coverImg ? (
          <Image
            src={coverImg}
            alt={story.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* No photo — logo fills the banner on a light bg */
          <div className="absolute inset-0 bg-gray-50 flex items-center justify-center px-10 py-8">
            {story.clientLogo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={story.clientLogo}
                alt={story.clientName || "Client"}
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-navy/10 to-accent-teal/10" />
            )}
          </div>
        )}

        {/* Industry badge */}
        {story.industry && (
          <div className="absolute top-4 left-4">
            <Badge variant="navy">{story.industry}</Badge>
          </div>
        )}

        {/* Top result chip */}
        {topResult && (
          <div className="absolute bottom-4 right-4 bg-white rounded-xl px-3 py-2 shadow-lg flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent-teal" />
            <span className="font-extrabold text-navy text-sm">{topResult.value}</span>
            <span className="text-body text-xs">{topResult.metric}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-6 flex-1">
        {/* Client identity */}
        {(story.clientLogo || story.clientName) && (
          <div className="flex items-center gap-2">
            {story.clientLogo && (
              <Image
                src={story.clientLogo}
                alt={story.clientName || "Client"}
                width={60}
                height={20}
                className="h-5 w-auto object-contain opacity-70"
                unoptimized
              />
            )}
            {story.clientName && (
              <span className="text-xs font-medium text-muted">{story.clientName}</span>
            )}
          </div>
        )}

        <h3 className="font-bold text-lg leading-snug group-hover:text-navy transition-colors line-clamp-2">
          {story.title}
        </h3>

        {/* Results chips */}
        {story.results?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {story.results.slice(0, 3).map((r) => (
              <span
                key={r.id}
                className="text-xs bg-bg-mint text-navy font-semibold px-2.5 py-1 rounded-full"
              >
                {r.value} {r.metric}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center gap-1 text-sm font-semibold text-navy group-hover:gap-2 transition-all">
          Read Story <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
