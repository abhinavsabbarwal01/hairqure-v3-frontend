"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ShieldCheck, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { City } from "@/lib/api.server";
import { slugify } from "@/lib/utils";

export default function Hero({ initialCities = [] }: { initialCities?: City[] }) {
  const [city, setCity] = useState("");
  const router = useRouter();
  const cities = initialCities.length ? initialCities : [{ cityId: 1, cityName: "Delhi" }, { cityId: 2, cityName: "Gurgaon" }, { cityId: 3, cityName: "Noida" }];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const c = city ? `?city=${slugify(city)}` : "";
    router.push(`/clinics${c}`);
  };

  // Deterministic hair-strand positions so no hydration mismatch
  const strands = [
    { l: "8%", t: "18%", d: "0s", s: 0.8 }, { l: "18%", t: "62%", d: "1.1s", s: 1.1 },
    { l: "30%", t: "28%", d: "0.4s", s: 0.9 }, { l: "44%", t: "75%", d: "1.6s", s: 1 },
    { l: "58%", t: "22%", d: "0.8s", s: 0.85 }, { l: "70%", t: "68%", d: "0.2s", s: 1.15 },
    { l: "82%", t: "35%", d: "1.3s", s: 1 }, { l: "92%", t: "58%", d: "0.6s", s: 0.9 },
    { l: "12%", t: "82%", d: "1.0s", s: 1.05 }, { l: "38%", t: "48%", d: "0.3s", s: 0.8 },
    { l: "63%", t: "45%", d: "1.4s", s: 0.95 }, { l: "88%", t: "15%", d: "0.9s", s: 1 },
  ];

  return (
    <section data-testid="hero" className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 text-white">
      {/* subtle glow */}
      <div className="orb bg-brand-400 h-96 w-96 -top-24 -left-24 opacity-50" />
      <div className="orb bg-accent-mint h-80 w-80 top-40 -right-24 opacity-20" />
      {/* animated hair strands (decorative, match prod motif) */}
      {strands.map((s, i) => (
        <svg key={i} aria-hidden="true"
          className="absolute text-white/25 animate-float pointer-events-none"
          style={{ left: s.l, top: s.t, animationDelay: s.d, width: `${22 * s.s}px`, height: `${34 * s.s}px` }}
          viewBox="0 0 22 34" fill="none">
          <path d="M11 1 C 14 6, 18 10, 18 18 C 18 26, 14 31, 11 33 C 8 31, 4 26, 4 18 C 4 10, 8 6, 11 1 Z" fill="currentColor" opacity=".85" />
          <circle cx="11" cy="5" r="1.5" fill="currentColor" />
        </svg>
      ))}

      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28 relative text-center animate-fade-up">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur px-3 py-1 text-xs font-semibold tracking-widest text-white uppercase">
          <ShieldCheck className="h-3.5 w-3.5" /> India&rsquo;s trusted hair marketplace
        </span>
        <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05]">
          Regain your hair<br/><span className="text-accent-mint">with confidence.</span>
        </h1>
        <p className="mt-5 max-w-2xl mx-auto text-lg text-white/80">
          Compare verified clinics, meet certified specialists, and see real before/after results. Transparent pricing, zero guesswork.
        </p>
        <form onSubmit={onSubmit} data-testid="hero-search"
          className="mt-10 mx-auto flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-2xl sm:rounded-full shadow-glow max-w-xl">
          <div className="flex items-center gap-2 flex-1 px-4">
            <MapPin className="h-5 w-5 text-brand-600 shrink-0" />
            <select data-testid="hero-city" value={city} onChange={(e) => setCity(e.target.value)}
              className="w-full bg-transparent py-3 text-ink-800 font-medium focus:outline-none">
              <option value="">Select your city</option>
              {cities.map((c) => <option key={String(c.cityId)} value={c.cityName}>{c.cityName}</option>)}
            </select>
          </div>
          <Button type="submit" size="lg" data-testid="hero-submit" className="gap-2">
            <Search className="h-4 w-4" /> Find Clinics
          </Button>
        </form>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/80">
          <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent-mint" /> 100+ verified clinics</div>
          <div className="flex items-center gap-2"><Star className="h-4 w-4 text-accent-amber fill-accent-amber" /> 4.8 avg patient rating</div>
          <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-white" /> Real before/after</div>
        </div>
      </div>
      <div className="bg-white border-y border-ink-100">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs font-semibold tracking-widest text-ink-400 uppercase">
          <span>As featured in</span><span>YourStory</span><span>Times of India</span><span>Mint</span><span>Inc42</span><span>ET Health</span>
        </div>
      </div>
    </section>
  );
}
