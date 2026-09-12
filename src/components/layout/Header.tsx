"use client";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "About Us", href: "/about-us" },
  { label: "Blog", href: "/blog" },
];

export function Header({ phone }: { phone?: string }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Pages that open on a dark full-bleed hero — the header floats over them. */
  const isDarkHero = pathname === "/";
  /* Transparent state: only while sitting on top of that dark hero. */
  const overlay = isDarkHero && !scrolled;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* Close the drawer on navigation. Adjusting state during render (rather than
     in an effect) avoids the cascading re-render React warns about. */
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          overlay
            ? "bg-transparent"
            : scrolled
              ? "bg-surface/85 backdrop-blur-xl border-b border-border-light shadow-lg shadow-black/40"
              : "bg-surface/60 backdrop-blur-md"
        )}
      >
        <div className="container-main flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="font-extrabold text-xl tracking-tight">
            <span className="font-light text-body transition-colors">Agency</span>
            <span className="text-navy transition-colors">Platform</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors py-1",
                    active ? "text-heading" : "text-body hover:text-heading"
                  )}
                >
                  {link.label}
                  {/* Underline grows on hover */}
                  <span
                    className={cn(
                      "absolute left-0 -bottom-0.5 h-[2px] rounded-full bg-accent-teal transition-all duration-300",
                      active ? "w-full" : "w-0"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop right actions */}
          <div className="hidden lg:flex items-center gap-4">
            {phone && (
              <a
                href={`tel:${phone}`}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium text-body transition-colors hover:text-heading"
                )}
              >
                <Phone className="w-4 h-4" />
                {phone}
              </a>
            )}
            <Button
              asChild
              size="md"
              className={cn(
                overlay &&
                  "bg-white/10 text-white border border-white/25 backdrop-blur-md hover:bg-white/20"
              )}
            >
              <Link href="/contact-us">Get a Free Consultation</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className={cn(
              "lg:hidden p-2 rounded-lg text-heading transition-colors hover:bg-white/10"
            )}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        {/* Panel */}
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-[280px] bg-surface-2 border-l border-border-light shadow-2xl flex flex-col transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between p-5 border-b border-border-light">
            <span className="font-extrabold text-heading">Menu</span>
            <button onClick={() => setMobileOpen(false)} className="p-1">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex flex-col p-5 gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-navy text-white"
                    : "text-body hover:bg-surface-3 hover:text-heading"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="p-5 mt-auto border-t border-border-light flex flex-col gap-3">
            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 text-sm font-medium text-body"
              >
                <Phone className="w-4 h-4 text-navy" />
                {phone}
              </a>
            )}
            <Button asChild className="w-full justify-center">
              <Link href="/contact-us">Get a Free Consultation</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Spacer offsets the fixed header — the dark hero supplies its own top padding. */}
      {!isDarkHero && <div className="h-16 lg:h-20" />}
    </>
  );
}
