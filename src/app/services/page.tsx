import { LeadCaptureCta } from "@/components/sections/LeadCaptureCta";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore our full suite of digital, technology, marketing, consulting, staffing and compliance services.",
};

async function getData() {
  const [services, categories] = await Promise.all([
    prisma.service.findMany({
      where: { status: "published" },
      include: { category: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
    prisma.serviceCategory.findMany({ orderBy: { name: "asc" } }),
  ]);
  return { services, categories };
}

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: activeSlug } = await searchParams;
  const { services, categories } = await getData();

  const filtered = activeSlug
    ? services.filter((s) => s.category?.slug === activeSlug)
    : services;

  return (
    <>
      {/* Hero */}
      <section className="section-pad bg-bg-mint">
        <div className="container-main text-center max-w-2xl mx-auto">
          <SectionLabel align="center">What We Do</SectionLabel>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-heading mb-4">
            All the Expertise You Need, Under One Roof
          </h1>
          <p className="text-body text-lg leading-relaxed">
            From digital marketing to compliance — we deliver end-to-end
            solutions that move the needle for your business.
          </p>
        </div>
      </section>

      {/* Category tabs */}
      {categories.length > 0 && (
        <section className="sticky top-16 z-10 bg-white border-b border-border-light">
          <div className="container-main">
            <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
              <Link
                href="/services"
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  !activeSlug
                    ? "bg-navy text-white"
                    : "text-body hover:text-heading hover:bg-bg-mint"
                }`}
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/services?category=${cat.slug}`}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                    activeSlug === cat.slug
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

      {/* Grid */}
      <section className="section-pad bg-white">
        <div className="container-main">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((service, i) => (
                <ServiceCard
                  key={service.id}
                  service={service as never}
                  featured={i === 1 && !activeSlug}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PLACEHOLDER_SERVICES.map((s, i) => (
                <div
                  key={s.title}
                  className={`p-6 rounded-2xl border border-border-light flex flex-col gap-4 ${
                    i === 1 ? "bg-navy" : "bg-white"
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${i === 1 ? "bg-white/20" : "bg-bg-mint"}`}>
                    <div className="w-7 h-7 rounded-lg bg-accent-teal/30" />
                  </div>
                  <h3 className={`font-bold text-lg ${i === 1 ? "text-white" : "text-heading"}`}>{s.title}</h3>
                  <p className={`text-sm leading-relaxed ${i === 1 ? "text-white/70" : "text-body"}`}>{s.desc}</p>
                  <span className={`text-sm font-semibold ${i === 1 ? "text-white" : "text-navy"}`}>Get in Touch →</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <LeadCaptureCta services={filtered as never} />
    </>
  );
}

const PLACEHOLDER_SERVICES = [
  { title: "Digital Marketing", desc: "Full-funnel digital marketing from brand awareness to conversion." },
  { title: "Web Design & Development", desc: "Beautiful, fast, and conversion-optimised websites." },
  { title: "SEO & Content Strategy", desc: "Rank higher, attract better leads, grow organically." },
  { title: "Brand Identity", desc: "Build a brand that people remember and trust." },
  { title: "Business Consulting", desc: "Strategic guidance for sustainable, scalable growth." },
  { title: "Staffing Solutions", desc: "Hire the right talent — fast — with our expert recruiting team." },
  { title: "Compliance & Legal Support", desc: "Stay compliant across all markets with our expert guidance." },
  { title: "Social Media Management", desc: "Content, community, and campaigns that grow your following." },
  { title: "PR & Communications", desc: "Shape your narrative and get your story in front of the right people." },
];
