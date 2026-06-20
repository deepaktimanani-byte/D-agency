import { LeadCaptureCta } from "@/components/sections/LeadCaptureCta";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StoryCard } from "@/components/ui/StoryCard";
import { prisma } from "@/lib/prisma";
import type { SuccessStory } from "@/types";
import { Quote, TrendingUp } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const s = await prisma.successStory.findUnique({ where: { slug } });
  if (!s) return { title: "Success Story" };
  return {
    title: s.metaTitle || s.title,
    description: s.metaDescription || s.challenge?.slice(0, 160),
  };
}

export default async function SuccessStoryDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [raw, allRaw] = await Promise.all([
    prisma.successStory.findUnique({ where: { slug, status: "published" }, include: { results: true, services: { include: { service: true } } } }),
    prisma.successStory.findMany({ where: { status: "published" }, include: { results: true }, orderBy: { createdAt: "desc" } }),
  ]);

  if (!raw) notFound();

  const story = raw as unknown as SuccessStory;
  const related = (allRaw as unknown as SuccessStory[]).filter((s) => s.id !== story.id).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="section-pad bg-navy text-white">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              {story.industry && (
                <span className="text-xs font-semibold text-accent-teal bg-accent-teal/20 px-3 py-1 rounded-full">
                  {story.industry}
                </span>
              )}
              {story.clientName && (
                <span className="text-white/60 text-sm">{story.clientName}</span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
              {story.title}
            </h1>
            {/* Results chips */}
            {story.results?.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {story.results.map((r) => (
                  <div key={r.id} className="flex items-center gap-2 bg-white/10 rounded-2xl px-4 py-2.5">
                    <TrendingUp className="w-4 h-4 text-accent-teal flex-shrink-0" />
                    <div>
                      <p className="font-extrabold text-white text-sm leading-none">{r.value}</p>
                      <p className="text-white/60 text-xs">{r.metric}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Cover image */}
      {story.gallery?.[0] && (
        <div className="container-main -mt-8">
          <div className="rounded-3xl overflow-hidden aspect-video relative">
            <Image
              src={story.gallery[0]}
              alt={story.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Body */}
      <section className="section-pad bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main */}
            <div className="lg:col-span-2 flex flex-col gap-10">
              {/* Challenge */}
              <div>
                <SectionLabel>The Challenge</SectionLabel>
                <p className="text-body leading-relaxed">{story.challenge}</p>
              </div>

              {/* Solution */}
              <div>
                <SectionLabel>Our Solution</SectionLabel>
                <p className="text-body leading-relaxed">{story.solution}</p>
              </div>

              {/* Gallery */}
              {story.gallery?.length > 1 && (
                <div>
                  <h3 className="font-bold text-heading mb-4">Gallery</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {story.gallery.slice(1).map((img, i) => (
                      <div key={i} className="rounded-2xl overflow-hidden aspect-video relative">
                        <Image src={img} alt={`Gallery ${i + 2}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonial */}
              {story.testimonial && (
                <blockquote className="border-l-4 border-accent-teal pl-6 py-2">
                  <Quote className="w-8 h-8 text-navy/20 fill-navy/10 mb-3" />
                  <p className="text-body text-lg italic leading-relaxed mb-4">
                    &ldquo;{story.testimonial}&rdquo;
                  </p>
                  {(story.testimonialAuthorName || story.testimonialAuthorRole) && (
                    <footer className="text-sm text-muted font-medium">
                      — {story.testimonialAuthorName}
                      {story.testimonialAuthorRole && `, ${story.testimonialAuthorRole}`}
                    </footer>
                  )}
                </blockquote>
              )}
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-6">
              {/* Client card */}
              {(story.clientLogo || story.clientName) && (
                <div className="p-6 rounded-2xl border border-border-light bg-white flex flex-col items-center gap-3">
                  {story.clientLogo && (
                    <div className="w-full h-24 relative flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={story.clientLogo}
                        alt={story.clientName || "Client"}
                        className="max-h-full max-w-[80%] object-contain"
                      />
                    </div>
                  )}
                  {story.clientName && (
                    <p className="text-sm font-semibold text-heading">{story.clientName}</p>
                  )}
                  {story.industry && (
                    <span className="text-xs font-semibold text-accent-teal bg-accent-teal/10 px-3 py-1 rounded-full">{story.industry}</span>
                  )}
                </div>
              )}

              {/* Results */}
              {story.results?.length > 0 && (
                <div className="p-6 rounded-2xl bg-bg-mint border border-border-light">
                  <h3 className="font-bold text-heading mb-4">Key Results</h3>
                  <div className="flex flex-col gap-4">
                    {story.results.map((r) => (
                      <div key={r.id} className="flex flex-col gap-0.5">
                        <p className="font-extrabold text-2xl text-navy">{r.value}</p>
                        <p className="text-body text-sm font-medium">{r.metric}</p>
                        {r.description && (
                          <p className="text-muted text-xs">{r.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Services used */}
              {story.services?.length > 0 && (
                <div className="p-6 rounded-2xl border border-border-light bg-white">
                  <h3 className="font-bold text-heading mb-4">Services Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {story.services.map(({ service }) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.slug}`}
                        className="text-xs font-semibold bg-bg-mint text-navy px-3 py-1.5 rounded-full hover:bg-navy hover:text-white transition-colors"
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="p-6 rounded-2xl bg-navy text-white">
                <h3 className="font-bold text-lg mb-2">Want similar results?</h3>
                <p className="text-white/70 text-sm mb-5 leading-relaxed">
                  Let&apos;s talk about your goals and build a plan together.
                </p>
                <Button asChild variant="teal" className="w-full justify-center">
                  <Link href="/contact-us">Get a Free Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More stories */}
      {related.length > 0 && (
        <section className="section-pad bg-bg-mint">
          <div className="container-main">
            <h2 className="text-2xl font-extrabold text-heading mb-8">More Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((s) => (
                <StoryCard key={s.id} story={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      <LeadCaptureCta />
    </>
  );
}
