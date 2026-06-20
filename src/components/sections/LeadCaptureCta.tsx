import { LeadForm } from "@/components/ui/LeadForm";
import type { Service } from "@/types";

interface LeadCtaProps {
  services?: Service[];
}

export function LeadCaptureCta({ services = [] }: LeadCtaProps) {
  const serviceOptions = services.map((s) => ({ id: s.id, title: s.title }));

  return (
    <section className="section-pad bg-bg-dark">
      <div className="container-main">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Grow? Let&apos;s Talk.
          </h2>
          <p className="text-white/60 leading-relaxed">
            Book a free consultation. No commitment, no jargon — just a
            straightforward conversation about your goals.
          </p>
        </div>
        <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10">
          <LeadForm
            variant="full"
            services={serviceOptions}
            redirectOnSuccess={true}
          />
        </div>
      </div>
    </section>
  );
}
