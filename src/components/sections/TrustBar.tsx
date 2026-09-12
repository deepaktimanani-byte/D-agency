import { prisma } from "@/lib/prisma";

const FALLBACK = ["Google", "Shopify", "HubSpot", "Slack", "Heroku", "Stripe", "Notion", "Figma"];

export async function TrustBar() {
  const clients = await prisma.successStory.findMany({
    where: { status: "published", clientLogo: { not: null } },
    select: { id: true, clientName: true, clientLogo: true },
    orderBy: { createdAt: "asc" },
  });

  const items =
    clients.length > 0
      ? clients.map((c) => ({ key: c.id, logo: c.clientLogo!, name: c.clientName || "Client" }))
      : FALLBACK.map((b) => ({ key: b, logo: null, name: b }));

  /* The marquee only looks continuous if one half already overflows the
     viewport, so pad a short client list out before duplicating it. */
  const padded = items.length === 0 ? [] : Array.from(
    { length: Math.max(items.length, 10) },
    (_, i) => items[i % items.length]
  );
  /* Rendered twice so the -50% translate loops seamlessly. */
  const track = [...padded, ...padded];

  return (
    <section className="bg-surface py-12 border-b border-border-light">
      <div className="container-main">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted text-center mb-9">
          Trusted by teams that ship
        </p>
      </div>

      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track">
          {track.map((item, i) => (
            <div
              key={`${item.key}-${i}`}
              aria-hidden={i >= padded.length}
              className="shrink-0 w-44 h-16 mx-4 flex items-center justify-center"
            >
              {item.logo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={item.logo}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain brightness-0 invert opacity-40 transition-all duration-300 hover:brightness-100 hover:invert-0 hover:opacity-100"
                />
              ) : (
                <span className="text-xl font-bold tracking-tight text-muted/60 transition-colors duration-300 hover:text-heading">
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
