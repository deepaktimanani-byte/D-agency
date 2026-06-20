import { LeadForm } from "@/components/ui/LeadForm";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { prisma } from "@/lib/prisma";
import type { SiteSettings } from "@/types";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with our team. Book a free consultation and let's talk about your goals.",
};

async function getData() {
  const [settingsRows, services] = await Promise.all([
    prisma.siteSetting.findMany(),
    prisma.service.findMany({ where: { status: "published" }, select: { id: true, title: true }, orderBy: { sortOrder: "asc" } }),
  ]);
  const settings = settingsRows.reduce<Partial<SiteSettings>>((acc, r) => ({ ...acc, [r.key]: r.value }), {});
  return { settings, services };
}

export default async function ContactPage() {
  const { settings, services } = await getData();

  const contactItems = [
    {
      icon: Phone,
      label: "Phone",
      value: settings.company_phone,
      href: settings.company_phone ? `tel:${settings.company_phone}` : undefined,
    },
    {
      icon: Mail,
      label: "Email",
      value: settings.company_email,
      href: settings.company_email ? `mailto:${settings.company_email}` : undefined,
    },
    {
      icon: MapPin,
      label: "Office",
      value: settings.company_address,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: settings.social_whatsapp,
      href: settings.social_whatsapp
        ? `https://wa.me/${settings.social_whatsapp.replace(/\D/g, "")}`
        : undefined,
    },
  ].filter((c) => c.value);

  const serviceOptions = services.map((s) => ({ id: s.id, title: s.title }));

  return (
    <>
      {/* Hero */}
      <section className="section-pad bg-bg-mint">
        <div className="container-main text-center max-w-2xl mx-auto">
          <SectionLabel align="center">Get In Touch</SectionLabel>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-heading mb-4">
            Let&apos;s Start a Conversation
          </h1>
          <p className="text-body text-lg leading-relaxed">
            Book a free 30-minute consultation. No commitment, no jargon — just
            a straight conversation about your goals.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="section-pad bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-xl font-bold text-heading mb-2">Contact Details</h2>
                <p className="text-body text-sm leading-relaxed">
                  Prefer to reach out directly? Use any of the channels below.
                </p>
              </div>

              <div className="flex flex-col gap-5">
                {contactItems.length > 0 ? (
                  contactItems.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-bg-mint flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-navy" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted uppercase tracking-wide">
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            className="text-heading font-medium text-sm hover:text-navy transition-colors"
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="text-heading font-medium text-sm">{value}</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-bg-mint flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-navy" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted uppercase tracking-wide">Phone</p>
                        <p className="text-heading font-medium text-sm">+1 (555) 000-0000</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-bg-mint flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-navy" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted uppercase tracking-wide">Email</p>
                        <p className="text-heading font-medium text-sm">hello@agencyplatform.com</p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Office hours */}
              <div className="p-5 rounded-2xl bg-bg-mint border border-border-light">
                <h4 className="font-semibold text-heading text-sm mb-3">Office Hours</h4>
                <div className="flex flex-col gap-1.5 text-sm text-body">
                  <div className="flex justify-between">
                    <span>Monday – Friday</span>
                    <span className="font-medium text-heading">9am – 6pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium text-heading">10am – 2pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium text-muted">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="p-8 rounded-3xl border border-border-light bg-white shadow-sm">
                <h2 className="text-xl font-bold text-heading mb-1">Send Us a Message</h2>
                <p className="text-body text-sm mb-6">
                  Fill in the form and we&apos;ll get back to you within 24 hours.
                </p>
                <LeadForm
                  variant="full"
                  services={serviceOptions}
                  redirectOnSuccess={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
