import { LeadCaptureCta } from "@/components/sections/LeadCaptureCta";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { prisma } from "@/lib/prisma";
import type { Service } from "@/types";
import { CheckCircle2, Clock, DollarSign, Users } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const s = await prisma.service.findUnique({ where: { slug } });
  if (!s) return { title: "Service" };
  return {
    title: s.metaTitle || s.title,
    description: s.metaDescription || s.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [raw, allServices] = await Promise.all([
    prisma.service.findUnique({ where: { slug, status: "published" }, include: { category: true } }),
    prisma.service.findMany({ where: { status: "published" }, include: { category: true }, orderBy: [{ sortOrder: "asc" }] }),
  ]);

  if (!raw) notFound();

  const svc = raw as unknown as Service;
  const related = allServices.filter((s) => s.id !== raw.id).slice(0, 3) as unknown as Service[];

  return (
    <>
      {/* Hero */}
      <section className="section-pad bg-bg-mint">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {svc.category && <SectionLabel>{svc.category.name}</SectionLabel>}
              <h1 className="text-4xl sm:text-5xl font-extrabold text-heading mb-5">{svc.title}</h1>
              <p className="text-body text-lg leading-relaxed mb-6">{svc.shortDescription}</p>

              {(svc.pricing || svc.timeline || svc.targetAudience) && (
                <div className="flex flex-wrap gap-3 mb-6">
                  {svc.pricing && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-border-light text-sm">
                      <DollarSign className="w-4 h-4 text-accent-teal" />
                      <span className="font-semibold text-heading">{svc.pricing}</span>
                    </div>
                  )}
                  {svc.timeline && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-border-light text-sm">
                      <Clock className="w-4 h-4 text-accent-teal" />
                      <span className="font-semibold text-heading">{svc.timeline}</span>
                    </div>
                  )}
                  {svc.targetAudience && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-border-light text-sm">
                      <Users className="w-4 h-4 text-accent-teal" />
                      <span className="font-semibold text-heading">{svc.targetAudience}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/contact-us">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/success-stories">See Our Work</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden aspect-video bg-navy">
              {svc.coverImage ? (
                <Image src={svc.coverImage} alt={svc.title} width={640} height={360} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-white p-10">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 mx-auto mb-4" />
                    <p className="font-bold text-xl">{svc.title}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main content + sidebar */}
      <section className="section-pad bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left — Overview + Process + FAQs */}
            <div className="lg:col-span-2">
              {svc.processSteps?.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-extrabold text-heading mb-6">Our Process</h2>
                  <div className="flex flex-col gap-6">
                    {svc.processSteps.map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center font-bold text-sm flex-shrink-0">{i + 1}</div>
                        <div className="flex-1 pt-1">
                          <h4 className="font-bold text-heading mb-1">{step.title}</h4>
                          <p className="text-body text-sm leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {svc.faqs?.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-extrabold text-heading mb-6">Frequently Asked Questions</h2>
                  <div className="flex flex-col gap-4">
                    {svc.faqs.map((faq, i) => (
                      <div key={i} className="p-5 rounded-2xl border border-border-light">
                        <h4 className="font-bold text-heading mb-2">{faq.question}</h4>
                        <p className="text-body text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-6">
              {svc.features?.length > 0 && (
                <div className="p-6 rounded-2xl bg-bg-mint border border-border-light">
                  <h3 className="font-bold text-heading mb-4">What&apos;s Included</h3>
                  <ul className="flex flex-col gap-2.5">
                    {svc.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-body">
                        <CheckCircle2 className="w-4 h-4 text-accent-teal flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(svc.pricing || svc.timeline || svc.targetAudience) && (
                <div className="p-6 rounded-2xl border border-border-light flex flex-col gap-4">
                  {svc.pricing && (
                    <div>
                      <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Pricing</p>
                      <p className="font-bold text-heading">{svc.pricing}</p>
                    </div>
                  )}
                  {svc.timeline && (
                    <div>
                      <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Typical Timeline</p>
                      <p className="font-bold text-heading">{svc.timeline}</p>
                    </div>
                  )}
                  {svc.targetAudience && (
                    <div>
                      <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Best For</p>
                      <p className="font-bold text-heading">{svc.targetAudience}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="p-6 rounded-2xl bg-navy text-white">
                <h3 className="font-bold text-lg mb-2">Ready to get started?</h3>
                <p className="text-white/70 text-sm mb-5 leading-relaxed">
                  Book a free consultation and let&apos;s talk about how {svc.title} can work for your business.
                </p>
                <Button asChild variant="teal" className="w-full justify-center">
                  <Link href="/contact-us">{svc.ctaText || "Get a Free Quote"}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-pad bg-bg-mint">
          <div className="container-main">
            <h2 className="text-2xl font-extrabold text-heading mb-8">Related Services</h2>
            <ServicesGrid services={related} />
          </div>
        </section>
      )}

      <LeadCaptureCta />
    </>
  );
}
