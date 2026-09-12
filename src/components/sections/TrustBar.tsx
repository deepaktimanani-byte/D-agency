import { prisma } from "@/lib/prisma";

export async function TrustBar() {
  const clients = await prisma.successStory.findMany({
    where: { status: "published", clientLogo: { not: null } },
    select: { id: true, clientName: true, clientLogo: true },
    orderBy: { createdAt: "asc" },
  });

  // No real client logos yet — show nothing rather than inventing brands.
  if (clients.length === 0) return null;

  // A marquee only makes sense with enough logos to fill the width. Below
  // that, cloning one logo across the screen reads as broken (and overstates
  // the client list), so a short list renders as a static centred row.
  const scroll = clients.length >= 4;

  const Logo = ({ logo, name }: { logo: string; name: string }) => (
    <div className="mx-4 flex h-20 w-40 shrink-0 items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo}
        alt={name}
        className="max-h-full max-w-full object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
        loading="lazy"
      />
    </div>
  );

  return (
    <section className="bg-surface py-12 border-b border-border-light">
      <div className="container-main">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted text-center mb-9">
          Trusted by teams that ship
        </p>
      </div>

      {scroll ? (
        <div className="marquee-mask overflow-hidden">
          {/* Duplicated so the -50% translate loops seamlessly. */}
          <div className="marquee-track">
            {[...clients, ...clients].map((c, i) => (
              <div key={`${c.id}-${i}`} aria-hidden={i >= clients.length}>
                <Logo logo={c.clientLogo!} name={c.clientName || "Client"} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="container-main flex flex-wrap items-center justify-center gap-2">
          {clients.map((c) => (
            <Logo key={c.id} logo={c.clientLogo!} name={c.clientName || "Client"} />
          ))}
        </div>
      )}
    </section>
  );
}
