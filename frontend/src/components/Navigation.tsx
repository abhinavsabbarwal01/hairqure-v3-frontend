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

  return (
    <header
      data-testid="site-nav"
      className={cn(
        "fixed top-0 inset-x-0 z-40 transition-all duration-300",
        scrolled ? "backdrop-blur-xl bg-white/80 shadow-soft" : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 flex h-18 md:h-20 items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2" data-testid="nav-logo">
          <Image src="/logo.png" alt="HairQure" width={140} height={36} priority className="h-8 w-auto" />
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
          className="lg:hidden p-2 text-ink-800"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          data-testid="nav-mobile-toggle"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-ink-100" data-testid="nav-mobile-menu">
          <div className="px-5 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="py-3 px-3 rounded-xl text-ink-700 font-medium hover:bg-ink-50">
                {l.label}
              </Link>
            ))}
            <Link href="/clinics" onClick={() => setOpen(false)} className="mt-2">
              <Button className="w-full" data-testid="nav-mobile-cta">Book Consultation</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
