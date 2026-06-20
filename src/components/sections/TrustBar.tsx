import { prisma } from "@/lib/prisma";

const FALLBACK = ["Google", "Shopify", "HubSpot", "Slack", "Heroku", "Stripe"];

export async function TrustBar() {
  const clients = await prisma.successStory.findMany({
    where: { status: "published", clientLogo: { not: null } },
    select: { id: true, clientName: true, clientLogo: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <section className="bg-bg-mint py-10 border-y border-border-light">
      <div className="container-main">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted text-center mb-8">
          Trusted by leading brands
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {clients.length > 0 ? (
            clients.map((c) => (
              <div key={c.id} className="flex items-center justify-center w-36 h-16">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.clientLogo!}
                  alt={c.clientName || "Client"}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))
          ) : (
            FALLBACK.map((brand) => (
              <span
                key={brand}
                className="w-36 h-16 flex items-center justify-center text-lg font-bold text-muted/50 hover:text-body transition-colors tracking-tight"
              >
                {brand}
              </span>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
