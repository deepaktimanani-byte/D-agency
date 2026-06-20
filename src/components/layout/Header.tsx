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

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-white/80 backdrop-blur-sm"
        )}
      >
        <div className="container-main flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="font-extrabold text-xl tracking-tight">
            <span className="text-heading font-light">Agency</span>
            <span className="text-navy">Platform</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-navy",
                  pathname === link.href ? "text-navy" : "text-heading"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right actions */}
          <div className="hidden lg:flex items-center gap-4">
            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 text-sm font-medium text-heading hover:text-navy transition-colors"
              >
                <Phone className="w-4 h-4" />
                {phone}
              </a>
            )}
            <Button asChild size="md">
              <Link href="/contact-us">Get a Free Consultation</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 rounded-lg hover:bg-bg-mint transition-colors"
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
            "absolute top-0 right-0 h-full w-[280px] bg-white shadow-2xl flex flex-col transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between p-5 border-b border-border-light">
            <span className="font-extrabold text-navy">Menu</span>
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
                    : "hover:bg-bg-mint text-heading"
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
                className="flex items-center gap-2 text-sm font-medium text-heading"
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

      {/* Spacer to offset fixed header */}
      <div className="h-16 lg:h-20" />
    </>
  );
}
