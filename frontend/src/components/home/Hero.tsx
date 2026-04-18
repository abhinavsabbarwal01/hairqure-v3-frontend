"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, ShieldCheck, Star, Sparkles, Award, Users, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { City, Clinic } from "@/lib/api.server";
import { slugify } from "@/lib/utils";

export default function Hero({ initialCities = [], featuredClinic }: { initialCities?: City[]; featuredClinic?: Clinic | null }) {
  const [city, setCity] = useState("");
  const router = useRouter();
  const cities = initialCities.length ? initialCities : [{ cityId: 1, cityName: "Delhi" }, { cityId: 2, cityName: "Gurgaon" }, { cityId: 3, cityName: "Noida" }];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const c = city ? `?city=${slugify(city)}` : "";
    router.push(`/clinics${c}`);
  };

  const fc = featuredClinic;
  const fcImg = fc?.thumbnailUrls?.[0] ?? fc?.imageUrl;
  const fcRating = fc?.averageRating ?? fc?.rating ?? 4.8;
  const fcSlug = fc ? `${slugify(fc.name)}-${fc.clinicId ?? fc.id ?? 1}` : "";
  const fcCity = fc?.cityName ?? fc?.city ?? "delhi";

  return (
    <section data-testid="hero" className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
      <div className="orb bg-brand-300 h-72 w-72 -top-16 -left-20" />
      <div className="orb bg-accent-mint h-80 w-80 top-32 -right-24 opacity-30" />
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-20 lg:pb-24 relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT */}
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

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <span className="text-ink-400 font-medium">Popular:</span>
              {["Hair Transplant", "PRP", "GFC", "Consultation"].map((t) => (
                <Link key={t} href={`/clinics`} className="px-3 py-1 rounded-full bg-white border border-ink-200 text-ink-700 text-xs font-medium hover:border-brand-400 hover:text-brand-600 transition">{t}</Link>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-500">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent-mint" /> 100+ verified clinics</div>
              <div className="flex items-center gap-2"><Star className="h-4 w-4 text-accent-amber fill-accent-amber" /> 4.8 avg patient rating</div>
              <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-brand-600" /> Real before/after</div>
            </div>
          </div>

          {/* RIGHT — Stats panel + Featured clinic */}
          <div className="lg:col-span-5 animate-fade-up">
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="rounded-2xl bg-white border border-ink-100 p-4 shadow-soft">
                <Users className="h-5 w-5 text-brand-600" />
                <p className="mt-2 font-display text-2xl font-extrabold text-ink-900">100+</p>
                <p className="text-xs text-ink-500 font-medium">Verified clinics</p>
              </div>
              <div className="rounded-2xl bg-white border border-ink-100 p-4 shadow-soft">
                <TrendingUp className="h-5 w-5 text-accent-mint" />
                <p className="mt-2 font-display text-2xl font-extrabold text-ink-900">12K+</p>
                <p className="text-xs text-ink-500 font-medium">Treatments done</p>
              </div>
              <div className="rounded-2xl bg-white border border-ink-100 p-4 shadow-soft">
                <Award className="h-5 w-5 text-accent-amber" />
                <p className="mt-2 font-display text-2xl font-extrabold text-ink-900">25+</p>
                <p className="text-xs text-ink-500 font-medium">Top specialists</p>
              </div>
            </div>

            {fc ? (
              <Link href={`/clinic/${slugify(String(fcCity))}/${fcSlug}`}
                data-testid="hero-featured-clinic"
                className="group block rounded-3xl bg-white border border-ink-100 overflow-hidden shadow-soft hover:shadow-glow hover:border-brand-300 transition-all">
                <div className="relative h-44 bg-ink-100">
                  {fcImg ? (
                    <Image src={fcImg} alt={fc.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:1024px) 100vw, 40vw" unoptimized />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-brand-500 to-brand-800 grid place-items-center"><Award className="h-12 w-12 text-white/80" /></div>
                  )}
                  <div className="absolute top-3 left-3 rounded-full bg-white/95 backdrop-blur px-3 py-1 text-xs font-bold text-ink-900 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-rose animate-pulse" /> Clinic spotlight
                  </div>
                  <div className="absolute top-3 right-3 rounded-full bg-white/95 backdrop-blur px-3 py-1 text-xs font-bold text-ink-900 flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-accent-amber text-accent-amber" /> {Number(fcRating).toFixed(1)}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-ink-900 group-hover:text-brand-600 transition-colors">{fc.name}</h3>
                  <p className="mt-1 flex items-center gap-1 text-sm text-ink-500"><MapPin className="h-3.5 w-3.5" /><span className="line-clamp-1">{fc.address ?? fc.areaName ?? String(fcCity)}</span></p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {["Hair Transplant", "PRP", "GFC"].map((s) => (
                        <span key={s} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700">{s}</span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-2 transition-all">View <ArrowRight className="h-4 w-4" /></span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white shadow-glow">
                <p className="text-sm opacity-80">Explore top-rated specialists</p>
                <p className="mt-2 font-display text-2xl font-bold">Delhi &middot; Gurgaon &middot; Noida</p>
                <Link href="/clinics" className="mt-4 inline-flex items-center gap-1 text-white/90 hover:text-white font-semibold text-sm">Browse all clinics <ArrowRight className="h-4 w-4" /></Link>
              </div>
            )}
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
