import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StoryCard } from "@/components/ui/StoryCard";
import type { SuccessStory } from "@/types";
import Link from "next/link";

interface SuccessStoriesHighlightProps {
  stories: SuccessStory[];
  variant?: "white" | "mint";
}

export function SuccessStoriesHighlight({ stories, variant = "white" }: SuccessStoriesHighlightProps) {
  const display = stories.filter((s) => s.isFeatured).slice(0, 3);
  const fallback = stories.slice(0, 3);
  const items = display.length > 0 ? display : fallback;

  return (
    <section className={`section-pad ${variant === "mint" ? "bg-bg-mint" : "bg-white"}`}>
      <div className="container-main">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <SectionLabel>Our Work</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-heading">
              Success Stories
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/success-stories">View All Stories</Link>
          </Button>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLACEHOLDER_STORIES.map((s) => (
              <div key={s.title} className="rounded-2xl border border-border-light overflow-hidden bg-white">
                <div className="h-48 bg-gradient-to-br from-navy/10 to-accent-teal/10 flex items-center justify-center">
                  <div className="text-center">
                    <p className="font-extrabold text-3xl text-navy">{s.result}</p>
                    <p className="text-body text-sm">{s.metric}</p>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-accent-teal bg-accent-teal/10 px-3 py-1 rounded-full">{s.industry}</span>
                  <h3 className="font-bold text-heading mt-3 mb-1">{s.title}</h3>
                  <p className="text-body text-sm">Read Story →</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

const PLACEHOLDER_STORIES = [
  { title: "How We Scaled a SaaS Startup to 10K Users", industry: "SaaS", result: "340%", metric: "Traffic Growth" },
  { title: "E-Commerce Revenue Doubled in 6 Months", industry: "E-Commerce", result: "$1.2M", metric: "Revenue Added" },
  { title: "Local Business Goes National With Digital Strategy", industry: "Retail", result: "5x", metric: "Lead Volume" },
];
