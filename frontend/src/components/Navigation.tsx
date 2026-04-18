"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/clinics", label: "Find Clinics" },
  { href: "/treatments", label: "Treatments" },
  { href: "/why-hairqure", label: "Why HairQure" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Lock body scroll + close on ESC when menu open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
      window.addEventListener("keydown", onKey);
      return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
    }
  }, [open]);

  return (
    <>
      <header
        data-testid="site-nav"
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled || open ? "backdrop-blur-xl bg-white/90 shadow-soft border-b border-ink-100" : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 flex h-20 items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-2.5" data-testid="nav-logo" onClick={() => setOpen(false)}>
            <Image src="/apple-touch-icon.png" alt="HairQure" width={40} height={40} priority className="h-9 w-9 rounded-xl shadow-sm" />
            <span className="hidden md:inline font-display text-xl font-extrabold text-brand-700 tracking-tight">HairQure</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                data-testid={`nav-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                className="relative px-4 py-2 text-sm font-medium text-ink-700 hover:text-brand-600 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+918650801405" className="flex items-center gap-2 text-sm font-semibold text-ink-800 hover:text-brand-600" data-testid="nav-call">
              <Phone className="h-4 w-4" /> +91 86508 01405
            </a>
            <Link href="/clinics"><Button size="sm" data-testid="nav-cta">Book Consultation</Button></Link>
          </div>

          <button
            className="lg:hidden p-2 text-ink-800 relative z-10"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            data-testid="nav-mobile-toggle"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile menu: backdrop + slide-in panel */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        data-testid="nav-mobile-backdrop"
        onClick={() => setOpen(false)}
      >
        <div className="absolute inset-0 bg-ink-900/50 backdrop-blur-md" />
      </div>

      <aside
        data-testid="nav-mobile-menu"
        className={cn(
          "lg:hidden fixed top-0 right-0 bottom-0 z-40 w-[78%] max-w-[340px] bg-white shadow-2xl transform transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!open}
      >
        <div className="h-20" /> {/* spacer under fixed header */}
        <nav className="px-5 py-4 flex flex-col gap-1">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3.5 px-4 rounded-2xl text-ink-800 font-semibold hover:bg-brand-50 hover:text-brand-700 transition-colors animate-fade-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-ink-100 flex flex-col gap-3">
            <a href="tel:+918650801405" className="flex items-center gap-2 text-sm font-semibold text-ink-700 hover:text-brand-600 px-4" data-testid="nav-mobile-call">
              <Phone className="h-4 w-4" /> +91 86508 01405
            </a>
            <Link href="/clinics" onClick={() => setOpen(false)}>
              <Button className="w-full" data-testid="nav-mobile-cta">Book Consultation</Button>
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
