"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ShieldCheck, Sparkles, Star } from "lucide-react";
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
    <section data-testid="hero" className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
      <div className="orb bg-brand-300 h-72 w-72 -top-16 -left-20" />
      <div className="orb bg-accent-mint h-80 w-80 top-32 -right-24 opacity-30" />
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-20 lg:pb-28 relative">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-semibold tracking-widest text-brand-700 uppercase shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5" /> India&rsquo;s trusted hair marketplace
            </span>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-ink-900">
              Regain your hair <span className="text-gradient">with confidence.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-500">
              Compare verified clinics, meet certified specialists, and see real before/after results. Transparent pricing, zero guesswork.
            </p>
            <form onSubmit={onSubmit} data-testid="hero-search"
              className="mt-8 flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-2xl sm:rounded-full shadow-soft border border-ink-100 max-w-xl">
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
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-ink-500">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent-mint" /> 100+ verified clinics</div>
              <div className="flex items-center gap-2"><Star className="h-4 w-4 text-accent-amber fill-accent-amber" /> 4.8 avg patient rating</div>
              <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-brand-600" /> Real before/after</div>
            </div>
          </div>
          <div className="lg:col-span-5 relative animate-fade-up">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-glow bg-gradient-to-br from-brand-600 to-brand-800">
              <div className="absolute inset-0 grain opacity-40" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <p className="text-sm opacity-80">Featured transformation</p>
                <p className="font-display text-2xl font-bold">12,000+ successful treatments</p>
              </div>
              <div className="absolute top-5 right-5 rounded-2xl bg-white/95 backdrop-blur p-3 shadow-soft animate-float">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-accent-mint/20 grid place-items-center"><ShieldCheck className="h-5 w-5 text-accent-mint" /></div>
                  <div><p className="text-xs text-ink-500">Verified clinics</p><p className="font-bold text-ink-900">100+</p></div>
                </div>
              </div>
              <div className="absolute bottom-5 left-5 rounded-2xl bg-white/95 backdrop-blur p-3 shadow-soft">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-accent-amber text-accent-amber" />
                  <div><p className="text-xs text-ink-500">Average rating</p><p className="font-bold text-ink-900">4.8 / 5</p></div>
                </div>
              </div>
            </div>
          </div>
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
