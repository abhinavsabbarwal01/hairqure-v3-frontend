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

  return (
    <section data-testid="hero" className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-white">
      {/* soft ambient glows */}
      <div className="orb bg-brand-300 h-96 w-96 -top-32 -left-32 opacity-40" />
      <div className="orb bg-accent-mint h-80 w-80 top-24 -right-32 opacity-20" />

      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32 relative text-center animate-fade-up">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-brand-700 uppercase shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-600 animate-pulse" />
          India&rsquo;s trusted hair marketplace
        </span>

        <h1 className="mt-7 font-display text-4xl sm:text-5xl lg:text-[4rem] font-extrabold leading-[1.02] tracking-tight text-ink-900">
          Regain your hair,
          <br />
          <span className="font-serif italic font-medium text-brand-600">reclaim</span>
          <span className="text-ink-900"> your confidence.</span>
        </h1>

        <p className="mt-6 max-w-xl mx-auto text-lg text-ink-500 leading-relaxed">
          A curated marketplace of verified clinics and certified specialists &mdash; with transparent pricing and real patient outcomes.
        </p>

        <form onSubmit={onSubmit} data-testid="hero-search"
          className="mt-10 mx-auto flex flex-col sm:flex-row gap-2 p-1.5 bg-white rounded-2xl sm:rounded-full shadow-soft ring-1 ring-ink-100 max-w-xl">
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

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ink-500">
          <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand-600" /> 100+ verified clinics</div>
          <div className="h-3 w-px bg-ink-200 hidden sm:block" />
          <div className="flex items-center gap-2"><Star className="h-4 w-4 text-accent-amber fill-accent-amber" /> 4.8 avg patient rating</div>
          <div className="h-3 w-px bg-ink-200 hidden sm:block" />
          <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-brand-600" /> Real before/after</div>
        </div>
      </div>

      {/* press strip — scrollable on mobile, wrapped on desktop */}
      <div className="bg-white border-y border-ink-100">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-5 overflow-x-auto">
          <div className="flex items-center justify-start md:justify-center gap-x-8 lg:gap-x-10 gap-y-3 text-[11px] font-semibold tracking-[0.2em] text-ink-400 uppercase whitespace-nowrap">
            <span className="text-ink-500">As featured in</span>
            <span>YourStory</span><span>Times of India</span><span>Mint</span><span>Inc42</span><span>ET Health</span>
          </div>
        </div>
      </div>
    </section>
  );
}
