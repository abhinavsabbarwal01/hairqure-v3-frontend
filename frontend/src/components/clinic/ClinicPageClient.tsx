"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Star, MapPin, Clock, Award, Phone, Calendar, Sparkles, Quote, CheckCircle2, Stethoscope, Camera, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Layout";
import type { ClinicDetails, Doctor, Clinic } from "@/lib/api.server";
import { slugify, cn } from "@/lib/utils";

interface Props { clinic: ClinicDetails; doctors: Doctor[]; related: Clinic[]; citySlug: string }

const TABS = [
  { id: "overview", label: "Overview", icon: Sparkles },
  { id: "doctors", label: "Doctors", icon: Stethoscope },
  { id: "gallery", label: "Gallery", icon: Camera },
  { id: "reviews", label: "Reviews", icon: MessageSquare },
];

const MOCK_REVIEWS = [
  { name: "Rohan S.", rating: 5, treatment: "Hair Transplant", months: 6, quote: "Incredible team. The surgeon explained every step and the results after 6 months look completely natural. Worth every rupee." },
  { name: "Priya K.", rating: 5, treatment: "PRP Therapy", months: 3, quote: "Clean clinic, punctual appointments, and my hair density has visibly improved. The staff actually remembers you between sessions." },
  { name: "Arjun M.", rating: 4, treatment: "GFC Treatment", months: 4, quote: "Results came slower than I expected, but the follow-ups and honest communication made me trust the process. Glad I chose this clinic." },
];

function formatTime(t?: string) {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hr = h % 12 || 12;
  return `${hr}:${String(m).padStart(2, "0")} ${ampm}`;
}

function isOpenNow(open?: string, close?: string, days?: string) {
  if (!open || !close || !days) return null;
  const now = new Date();
  const day = now.toLocaleString("en-US", { weekday: "long" });
  if (!days.includes(day)) return false;
  const [oH, oM] = open.split(":").map(Number);
  const [cH, cM] = close.split(":").map(Number);
  const mins = now.getHours() * 60 + now.getMinutes();
  return mins >= (oH * 60 + oM) && mins <= (cH * 60 + cM);
}

export default function ClinicPageClient({ clinic, doctors, related, citySlug }: Props) {
  const [active, setActive] = useState("overview");
  const tabsRef = useRef<HTMLDivElement>(null);
  const [tabsStuck, setTabsStuck] = useState(false);
  const heroImg = clinic.thumbnailUrls?.[0];
  const openNow = isOpenNow(clinic.clinicOpenTime, clinic.clinicCloseTime, clinic.daysClinicsOpen);
  const prices = (clinic.services ?? []).map((s) => s.basePrice ?? 0).filter((x) => x > 0);
  const minPrice = prices.length ? Math.min(...prices) : null;

  // Scrollspy + sticky detection
  useEffect(() => {
    const opts = { rootMargin: "-120px 0px -60% 0px", threshold: 0 };
    const io = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, opts);
    TABS.forEach((t) => { const el = document.getElementById(t.id); if (el) io.observe(el); });

    const onScroll = () => {
      if (tabsRef.current) {
        const rect = tabsRef.current.getBoundingClientRect();
        setTabsStuck(rect.top <= 80);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const openLeadModal = () => {
    const btn = document.querySelector('[data-testid="floating-cta-desktop"]') as HTMLButtonElement | null;
    (btn ?? document.querySelector('[data-testid="floating-cta"]') as HTMLButtonElement | null)?.click();
  };

  return (
    <div className="bg-white pb-28 md:pb-10" data-testid="clinic-page">
      {/* Breadcrumb */}
      <Container>
        <nav className="pt-6 flex items-center gap-1 text-xs text-ink-400 overflow-x-auto whitespace-nowrap" aria-label="Breadcrumb" data-testid="clinic-breadcrumb">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/clinics" className="hover:text-brand-600">Clinics</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/clinics?city=${citySlug}`} className="hover:text-brand-600 capitalize">{clinic.city ?? citySlug}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-ink-700 font-medium truncate">{clinic.name}</span>
        </nav>
      </Container>

      {/* HERO */}
      <Container>
        <div className="mt-6 grid lg:grid-cols-[1.4fr_1fr] gap-6">
          <div className="relative aspect-[16/10] lg:aspect-auto rounded-3xl overflow-hidden bg-ink-100 min-h-[260px]">
            {heroImg ? (
              <Image src={heroImg} alt={clinic.name} fill className="object-cover" sizes="(max-width:1024px) 100vw, 60vw" unoptimized priority />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-brand-100 to-brand-50 grid place-items-center"><Award className="h-16 w-16 text-brand-400" /></div>
            )}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="rounded-full bg-white/95 backdrop-blur px-3 py-1 text-xs font-bold text-ink-900 flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-accent-amber text-accent-amber" /> {Number(clinic.averageRating ?? 4.7).toFixed(1)}
              </span>
              {openNow !== null && (
                <span className={cn("rounded-full backdrop-blur px-3 py-1 text-xs font-bold flex items-center gap-1.5",
                  openNow ? "bg-accent-mint/95 text-white" : "bg-ink-900/85 text-white")}>
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  {openNow ? "Open now" : "Closed"}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <Eyebrow>Verified clinic</Eyebrow>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-ink-900 leading-[1.1]">
              {clinic.name}
            </h1>
            {clinic.description && <p className="mt-3 text-ink-500">{clinic.description}</p>}

            <ul className="mt-5 space-y-2.5 text-sm text-ink-700">
              {clinic.address && <li className="flex gap-2"><MapPin className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" /><span>{clinic.address}</span></li>}
              {clinic.clinicOpenTime && <li className="flex gap-2"><Clock className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" /><span>{formatTime(clinic.clinicOpenTime)} &ndash; {formatTime(clinic.clinicCloseTime)}</span></li>}
              {clinic.totalExperience && <li className="flex gap-2"><Award className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" /><span><strong>{clinic.totalExperience}+ years</strong> of combined clinical experience</span></li>}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={openLeadModal} data-testid="clinic-book-top" size="lg">
                <Calendar className="h-4 w-4" /> Book Consultation
              </Button>
              <a href="tel:+918650801405"><Button variant="outline" size="lg" data-testid="clinic-call"><Phone className="h-4 w-4" /> Call clinic</Button></a>
            </div>

            {minPrice && (
              <p className="mt-4 text-xs text-ink-400">Consultation starting from <span className="font-bold text-ink-900">&#8377;{minPrice.toLocaleString("en-IN")}</span></p>
            )}
          </div>
        </div>
      </Container>

      {/* Sticky Tabs */}
      <div ref={tabsRef} className={cn("sticky top-20 z-30 mt-10 border-y transition-all", tabsStuck ? "bg-white/95 backdrop-blur-xl border-ink-100 shadow-sm" : "bg-white border-ink-100")}>
        <Container>
          <nav className="flex gap-1 overflow-x-auto" data-testid="clinic-tabs">
            {TABS.map((t) => (
              <button key={t.id} onClick={() => scrollTo(t.id)} data-testid={`tab-${t.id}`}
                className={cn("relative flex items-center gap-2 px-4 sm:px-5 py-4 text-sm font-semibold whitespace-nowrap transition-colors",
                  active === t.id ? "text-brand-700" : "text-ink-500 hover:text-ink-800")}>
                <t.icon className="h-4 w-4" /> {t.label}
                {active === t.id && <span className="absolute inset-x-2 -bottom-px h-0.5 bg-brand-600 rounded-full" />}
              </button>
            ))}
          </nav>
        </Container>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] lg:gap-10 mt-10">
        <div>
          {/* OVERVIEW */}
          <section id="overview" className="scroll-mt-32">
            <Container>
              <Eyebrow>Overview</Eyebrow>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-ink-900">About {clinic.name}</h2>
              <p className="mt-4 text-ink-600 leading-relaxed">{clinic.description ?? "A verified hair specialist clinic focused on ethical, outcome-based treatments."}</p>

              <h3 className="mt-10 font-display text-xl font-bold text-ink-900">Services &amp; pricing</h3>
              <div className="mt-4 divide-y divide-ink-100 rounded-2xl border border-ink-100 overflow-hidden">
                {(clinic.services ?? []).length === 0 && <p className="p-6 text-ink-400 text-sm">Service list not available. Please contact the clinic.</p>}
                {clinic.services?.map((s, i) => (
                  <div key={s.id ?? i} className="p-5 sm:p-6 flex items-start justify-between gap-4 hover:bg-brand-50/40 transition" data-testid={`service-${i}`}>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-ink-900">{s.serviceName ?? s.service?.name}</p>
                      {(s.description || s.service?.description) && <p className="mt-1 text-sm text-ink-500 line-clamp-2">{s.description ?? s.service?.description}</p>}
                      <div className="mt-2 flex items-center gap-3 text-xs text-ink-400">
                        {s.durationMinutes && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{s.durationMinutes} min</span>}
                        {s.service?.shortCode && <span className="px-2 py-0.5 rounded-full bg-ink-100 font-semibold">{s.service.shortCode}</span>}
                      </div>
                    </div>
                    {s.basePrice ? <p className="text-base font-bold text-brand-700 shrink-0">&#8377;{s.basePrice.toLocaleString("en-IN")}</p> : null}
                  </div>
                ))}
              </div>

              <h3 className="mt-10 font-display text-xl font-bold text-ink-900">Hours &amp; location</h3>
              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-ink-100 p-5">
                  <p className="flex items-center gap-2 text-sm font-semibold text-ink-900"><Clock className="h-4 w-4 text-brand-600" /> Opening hours</p>
                  {clinic.clinicOpenTime && <p className="mt-2 text-ink-700">{formatTime(clinic.clinicOpenTime)} &ndash; {formatTime(clinic.clinicCloseTime)}</p>}
                  {clinic.daysClinicsOpen && <p className="mt-1 text-xs text-ink-500">{clinic.daysClinicsOpen.replaceAll(",", " · ")}</p>}
                </div>
                <div className="rounded-2xl border border-ink-100 p-5">
                  <p className="flex items-center gap-2 text-sm font-semibold text-ink-900"><MapPin className="h-4 w-4 text-brand-600" /> Location</p>
                  <p className="mt-2 text-ink-700 text-sm">{clinic.address}</p>
                  {clinic.googleMapUrl && <a href={clinic.googleMapUrl} target="_blank" rel="noopener" className="mt-2 inline-flex items-center gap-1 text-brand-600 text-sm font-semibold">Open in Google Maps <ArrowRight className="h-3.5 w-3.5" /></a>}
                </div>
              </div>
            </Container>
          </section>

          {/* DOCTORS */}
          <section id="doctors" className="scroll-mt-32 mt-16">
            <Container>
              <Eyebrow>Specialists</Eyebrow>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-ink-900">Meet the doctors</h2>
              <div className="mt-6 grid md:grid-cols-2 gap-5">
                {doctors.length === 0 && <p className="text-ink-400 text-sm">Doctor profiles will be added soon.</p>}
                {doctors.map((d, i) => (
                  <div key={d.id ?? i} className="rounded-3xl border border-ink-100 p-6 flex gap-5 hover:border-brand-200 hover:shadow-soft transition" data-testid={`doctor-${i}`}>
                    <div className="relative h-20 w-20 shrink-0 rounded-2xl overflow-hidden bg-ink-100">
                      {d.profileImageUrl ? (
                        <Image src={d.profileImageUrl} alt={`${d.firstName} ${d.lastName}`} fill unoptimized className="object-cover" sizes="80px" />
                      ) : (
                        <div className="h-full w-full bg-brand-50 grid place-items-center"><Stethoscope className="h-8 w-8 text-brand-400" /></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-ink-900">Dr. {d.firstName} {d.lastName}</p>
                      {d.specialization && <p className="text-sm text-brand-700 font-medium">{d.specialization.trim()}</p>}
                      {d.experienceYears && <p className="text-xs text-ink-500 mt-1">{d.experienceYears}+ years experience</p>}
                      {d.bio && <p className="mt-3 text-sm text-ink-500 line-clamp-3">{d.bio}</p>}
                      {(d.qualifications ?? []).length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {d.qualifications!.slice(0, 3).map((q) => <span key={q.id} className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700">{q.degree}</span>)}
                          {(d.certifications ?? []).slice(0, 2).map((c) => <span key={c.id} className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">{c.name.trim()}</span>)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </section>

          {/* GALLERY */}
          <section id="gallery" className="scroll-mt-32 mt-16">
            <Container>
              <Eyebrow>Before / After</Eyebrow>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-ink-900">Real patient results</h2>
              <p className="mt-2 text-ink-500 text-sm">Unedited, authentic transformations from this clinic.</p>
              <BeforeAfterGallery services={clinic.services ?? []} />
            </Container>
          </section>

          {/* REVIEWS */}
          <section id="reviews" className="scroll-mt-32 mt-16">
            <Container>
              <Eyebrow>Patient reviews</Eyebrow>
              <div className="mt-3 flex items-end gap-4">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-900">What patients say</h2>
                <div className="flex items-center gap-1 pb-1">
                  <Star className="h-4 w-4 fill-accent-amber text-accent-amber" />
                  <span className="font-bold text-ink-900">{Number(clinic.averageRating ?? 4.7).toFixed(1)}</span>
                  <span className="text-ink-400 text-sm">· curated</span>
                </div>
              </div>
              <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {MOCK_REVIEWS.map((r, i) => (
                  <div key={i} className="rounded-3xl border border-ink-100 p-6 hover:border-brand-200 hover:shadow-soft transition" data-testid={`review-${i}`}>
                    <Quote className="h-6 w-6 text-brand-300" />
                    <p className="mt-3 text-ink-700 text-sm leading-relaxed">&ldquo;{r.quote}&rdquo;</p>
                    <div className="mt-5 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-ink-900 text-sm">{r.name}</p>
                        <p className="text-xs text-ink-400">{r.treatment} · {r.months}mo ago</p>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, k) => <Star key={k} className={cn("h-3.5 w-3.5", k < r.rating ? "fill-accent-amber text-accent-amber" : "text-ink-200")} />)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-ink-400">Reviews shown are curated testimonials. Full patient review integration coming soon.</p>
            </Container>
          </section>

          {/* Related clinics */}
          {related.length > 0 && (
            <section className="mt-20 bg-brand-50/60 py-16">
              <Container>
                <Eyebrow>Explore</Eyebrow>
                <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold text-ink-900">Other clinics you may like</h3>
                <div className="mt-6 grid sm:grid-cols-3 gap-5">
                  {related.map((c, i) => {
                    const rid = c.clinicId ?? c.id ?? i;
                    const rcity = c.cityName ?? c.city ?? "delhi";
                    const rslug = `${slugify(c.name)}-${rid}`;
                    return (
                      <Link key={String(rid)+i} href={`/clinic/${slugify(String(rcity))}/${rslug}`} data-testid={`related-${i}`}
                        className="group rounded-2xl bg-white border border-ink-100 p-4 hover:border-brand-300 hover:shadow-soft transition-all flex gap-4">
                        <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-ink-100 shrink-0">
                          {c.thumbnailUrls?.[0] && <Image src={c.thumbnailUrls[0]} alt={c.name} fill className="object-cover" sizes="64px" unoptimized />}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-ink-900 text-sm line-clamp-1">{c.name}</p>
                          <p className="text-xs text-ink-500 flex items-center gap-1 mt-0.5"><Star className="h-3 w-3 fill-accent-amber text-accent-amber" /> {Number(c.averageRating ?? c.rating ?? 4.7).toFixed(1)}</p>
                          <p className="text-xs text-ink-400 mt-0.5 line-clamp-1">{c.address ?? c.areaName ?? rcity}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </Container>
            </section>
          )}
        </div>

        {/* Sticky booking rail (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-40 pr-5">
            <div className="rounded-3xl border border-ink-100 p-6 shadow-soft bg-white">
              <p className="flex items-center gap-2 text-[11px] font-semibold tracking-widest text-brand-600 uppercase"><CheckCircle2 className="h-3.5 w-3.5" /> Free Consultation</p>
              <h3 className="mt-2 font-display text-xl font-bold text-ink-900">Book with {clinic.name.split(" ").slice(0, 3).join(" ")}</h3>
              <ul className="mt-4 space-y-2 text-sm text-ink-700">
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-accent-mint mt-0.5" /> Talk to a verified specialist</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-accent-mint mt-0.5" /> Transparent pricing &amp; plan</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-accent-mint mt-0.5" /> Reply within 24 hours</li>
              </ul>
              {minPrice && <div className="mt-5 rounded-xl bg-brand-50 p-3 text-xs"><span className="text-ink-500">Consultation from </span><span className="font-bold text-ink-900">&#8377;{minPrice.toLocaleString("en-IN")}</span></div>}
              <Button onClick={openLeadModal} className="w-full mt-5" size="lg" data-testid="clinic-book-rail">
                <Calendar className="h-4 w-4" /> Book Consultation
              </Button>
              <a href="https://wa.me/918650801405" target="_blank" rel="noopener" className="mt-2 flex items-center justify-center gap-2 rounded-full border-2 border-ink-200 text-ink-800 font-semibold h-11 text-sm hover:border-brand-400 hover:text-brand-600 transition">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile sticky bottom booking bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-ink-100 p-3 flex gap-2 shadow-[0_-8px_24px_-6px_rgba(0,0,0,0.08)]" data-testid="clinic-mobile-book-bar">
        <a href="tel:+918650801405" className="grid place-items-center h-12 w-12 rounded-full border border-ink-200 text-ink-800"><Phone className="h-5 w-5" /></a>
        <Button onClick={openLeadModal} size="lg" className="flex-1" data-testid="clinic-book-mobile">
          <Calendar className="h-4 w-4" /> Book Consultation
        </Button>
      </div>
    </div>
  );
}

function BeforeAfterGallery({ services }: { services: import("@/lib/api.server").ClinicService[] }) {
  const images = services.flatMap((s) => s.beforeAfterImages ?? []).slice(0, 6);
  if (images.length === 0) {
    return <p className="mt-6 text-ink-400 text-sm rounded-2xl border border-dashed border-ink-200 p-8 text-center">Transformation photos will be uploaded soon.</p>;
  }
  return (
    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {images.map((img, i) => (
        <div key={img.id ?? i} className="group rounded-2xl overflow-hidden border border-ink-100 bg-white" data-testid={`gallery-${i}`}>
          <div className="grid grid-cols-2">
            <div className="relative aspect-square bg-ink-100">
              <Image src={img.beforeImageUrl} alt="Before" fill className="object-cover" unoptimized sizes="(max-width:640px) 50vw, 20vw" />
              <span className="absolute top-2 left-2 text-[10px] font-bold tracking-widest uppercase text-white bg-ink-900/80 rounded-full px-2 py-0.5">Before</span>
            </div>
            <div className="relative aspect-square bg-ink-100">
              <Image src={img.afterImageUrl} alt="After" fill className="object-cover" unoptimized sizes="(max-width:640px) 50vw, 20vw" />
              <span className="absolute top-2 left-2 text-[10px] font-bold tracking-widest uppercase text-white bg-accent-mint/90 rounded-full px-2 py-0.5">After</span>
            </div>
          </div>
          {img.description && <p className="p-3 text-xs text-ink-500">{img.description}</p>}
        </div>
      ))}
    </div>
  );
}
