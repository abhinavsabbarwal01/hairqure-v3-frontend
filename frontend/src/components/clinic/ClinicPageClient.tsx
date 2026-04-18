"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Star, MapPin, Award, Phone, Calendar, Sparkles, Quote, CheckCircle2, Stethoscope, Camera, MessageSquare, ArrowRight, Tag, Clock, Expand, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Layout";
import type { ClinicDetails, Doctor, Clinic, ServicePackage } from "@/lib/api.server";
import { slugify, cn } from "@/lib/utils";
import Lightbox, { type LightboxImage } from "./Lightbox";
import BeforeAfterCarousel from "./BeforeAfterCarousel";
import HoursAccordion from "./HoursAccordion";
import DoctorModal from "./DoctorModal";

interface Props {
  clinic: ClinicDetails;
  doctors: Doctor[];
  related: Clinic[];
  citySlug: string;
  packagesByServiceId: Record<number, ServicePackage[]>;
}

const TABS = [
  { id: "overview", label: "Overview", icon: Sparkles },
  { id: "services", label: "Services", icon: Tag },
  { id: "doctors", label: "Doctors", icon: Stethoscope },
  { id: "gallery", label: "Gallery", icon: Camera },
  { id: "reviews", label: "Reviews", icon: MessageSquare },
];

const MOCK_REVIEWS = [
  { name: "Rohan S.", rating: 5, treatment: "Hair Transplant", months: 6, quote: "Incredible team. The surgeon explained every step and the results after 6 months look completely natural. Worth every rupee." },
  { name: "Priya K.", rating: 5, treatment: "PRP Therapy", months: 3, quote: "Clean clinic, punctual appointments, and my hair density has visibly improved. The staff actually remembers you between sessions." },
  { name: "Arjun M.", rating: 4, treatment: "GFC Treatment", months: 4, quote: "Results came slower than I expected, but the follow-ups and honest communication made me trust the process. Glad I chose this clinic." },
];

function fmt(t?: string) {
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

export default function ClinicPageClient({ clinic, doctors, related, citySlug, packagesByServiceId }: Props) {
  const [active, setActive] = useState("overview");
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null);
  const [doctorOpen, setDoctorOpen] = useState<Doctor | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [tabsStuck, setTabsStuck] = useState(false);

  const heroImg = clinic.thumbnailUrls?.[0];
  const heroImages = clinic.thumbnailUrls ?? [];
  const openNow = isOpenNow(clinic.clinicOpenTime, clinic.clinicCloseTime, clinic.daysClinicsOpen);
  const prices = (clinic.services ?? []).map((s) => s.basePrice ?? 0).filter((x) => x > 0);
  const minPrice = prices.length ? Math.min(...prices) : null;

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-120px 0px -60% 0px", threshold: 0 });
    TABS.forEach((t) => { const el = document.getElementById(t.id); if (el) io.observe(el); });
    const onScroll = () => { if (tabsRef.current) setTabsStuck(tabsRef.current.getBoundingClientRect().top <= 80); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" });
  };

  const openLead = () => {
    (document.querySelector('[data-testid="floating-cta-desktop"]') as HTMLButtonElement | null)?.click()
      ?? (document.querySelector('[data-testid="floating-cta"]') as HTMLButtonElement | null)?.click();
  };

  return (
    <div className="bg-white pb-28 md:pb-10" data-testid="clinic-page">
      {/* Breadcrumb */}
      <Container>
        <nav className="pt-6 flex items-center gap-1 text-xs text-ink-400 overflow-x-auto whitespace-nowrap" aria-label="Breadcrumb">
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
          <button type="button" onClick={() => heroImg && setLightbox({ src: heroImg, alt: clinic.name, caption: clinic.name })}
            className="relative aspect-[16/10] lg:aspect-auto rounded-3xl overflow-hidden bg-ink-100 min-h-[260px] group cursor-zoom-in"
            data-testid="clinic-hero-image">
            {heroImg ? (
              <>
                <Image src={heroImg} alt={clinic.name} fill className="object-cover" sizes="(max-width:1024px) 100vw, 60vw" unoptimized priority />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/30 via-transparent to-transparent" />
                <div className="absolute bottom-3 right-3 h-9 w-9 rounded-full bg-white/90 backdrop-blur grid place-items-center opacity-0 group-hover:opacity-100 transition"><Expand className="h-4 w-4" /></div>
              </>
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
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />{openNow ? "Open now" : "Closed"}
                </span>
              )}
            </div>
            {heroImages.length > 1 && (
              <div className="absolute bottom-4 left-4 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-ink-900">
                {heroImages.length} photos
              </div>
            )}
          </button>

          <div className="flex flex-col">
            <Eyebrow>Verified clinic</Eyebrow>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-ink-900 leading-[1.1]">{clinic.name}</h1>
            {clinic.description && <p className="mt-3 text-ink-500">{clinic.description}</p>}
            <ul className="mt-5 space-y-2.5 text-sm text-ink-700">
              {clinic.address && <li className="flex gap-2"><MapPin className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" /><span>{clinic.address}</span></li>}
              {clinic.totalExperience && <li className="flex gap-2"><Award className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" /><span><strong>{clinic.totalExperience}+ years</strong> of combined clinical experience</span></li>}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={openLead} data-testid="clinic-book-top" size="lg"><Calendar className="h-4 w-4" /> Book Consultation</Button>
              <a href="tel:+918650801405"><Button variant="outline" size="lg" data-testid="clinic-call"><Phone className="h-4 w-4" /> Call clinic</Button></a>
            </div>
            {minPrice && <p className="mt-4 text-xs text-ink-400">Consultation starting from <span className="font-bold text-ink-900">&#8377;{minPrice.toLocaleString("en-IN")}</span></p>}
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

              <h3 className="mt-10 font-display text-xl font-bold text-ink-900">Location &amp; hours</h3>
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-ink-100 p-5">
                  <p className="flex items-center gap-2 text-sm font-semibold text-ink-900"><MapPin className="h-4 w-4 text-brand-600" /> Address</p>
                  <p className="mt-2 text-ink-700 text-sm leading-relaxed">{clinic.address}</p>
                  {clinic.area && <p className="mt-1 text-xs text-ink-500">{clinic.area}{clinic.state && `, ${clinic.state}`}</p>}
                  {clinic.googleMapUrl && <a href={clinic.googleMapUrl} target="_blank" rel="noopener" className="mt-3 inline-flex items-center gap-1 text-brand-600 text-sm font-semibold">View on map <ArrowRight className="h-3.5 w-3.5" /></a>}
                </div>
                <HoursAccordion open={clinic.clinicOpenTime} close={clinic.clinicCloseTime} daysCsv={clinic.daysClinicsOpen} />
              </div>
            </Container>
          </section>

          {/* SERVICES */}
          <section id="services" className="scroll-mt-32 mt-16">
            <Container>
              <Eyebrow>Our services</Eyebrow>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-ink-900">Treatments available here</h2>
              <p className="mt-2 text-ink-500">Explore services with transparent pricing, packages, and real patient transformations.</p>
              {(clinic.services ?? []).length === 0 ? (
                <p className="mt-8 text-ink-400 text-sm rounded-2xl border border-dashed border-ink-200 p-8 text-center">Service list not available. Please contact the clinic.</p>
              ) : (
                <div className="mt-6 grid md:grid-cols-2 gap-5">
                  {clinic.services!.map((s, i) => {
                    const pkgs = packagesByServiceId[s.id] ?? [];
                    const bestDiscount = pkgs.length ? Math.max(...pkgs.map((p) => p.discountPercent ?? 0)) : 0;
                    const hasImages = (s.beforeAfterImages ?? []).length > 0;
                    return (
                      <article key={s.id ?? i} data-testid={`service-${i}`} className="rounded-3xl border border-ink-100 bg-white overflow-hidden hover:border-brand-200 hover:shadow-soft transition-all">
                        {hasImages && (
                          <div className="p-3">
                            <BeforeAfterCarousel
                              images={s.beforeAfterImages!}
                              onImageClick={(src, caption) => setLightbox({ src, alt: s.serviceName ?? "", caption: `${s.serviceName ?? s.service?.name} — ${caption}` })}
                            />
                          </div>
                        )}
                        <div className="p-5 pt-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h3 className="font-display font-bold text-ink-900">{s.serviceName ?? s.service?.name}</h3>
                              {(s.description || s.service?.description) && <p className="mt-1 text-sm text-ink-500 line-clamp-2">{s.description ?? s.service?.description}</p>}
                              <div className="mt-3 flex items-center gap-2 text-xs text-ink-500">
                                {s.durationMinutes && <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {s.durationMinutes} min</span>}
                                {s.service?.shortCode && <span className="px-2 py-0.5 rounded-full bg-ink-100 font-semibold">{s.service.shortCode}</span>}
                              </div>
                            </div>
                            {s.basePrice ? (
                              <div className="text-right shrink-0">
                                <p className="text-xs text-ink-400">From</p>
                                <p className="text-lg font-extrabold text-brand-700">&#8377;{s.basePrice.toLocaleString("en-IN")}</p>
                              </div>
                            ) : null}
                          </div>
                          {pkgs.length > 0 && (
                            <div className="mt-4 rounded-xl bg-gradient-to-r from-accent-mint/10 to-brand-50 border border-accent-mint/30 p-3">
                              <p className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                                <Tag className="h-3.5 w-3.5" /> Save up to {bestDiscount}% with session packages
                              </p>
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {pkgs.slice(0, 3).map((p) => (
                                  <span key={p.id} className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white border border-emerald-100 text-ink-700">
                                    {p.sessionsCount} sessions &middot; &#8377;{p.totalPrice.toLocaleString("en-IN")}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          <Button variant="outline" size="sm" onClick={openLead} className="mt-4 w-full" data-testid={`service-book-${i}`}>Book this service</Button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
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
                  <button key={d.id ?? i} type="button" onClick={() => setDoctorOpen(d)} data-testid={`doctor-${i}`}
                    className="text-left rounded-3xl border border-ink-100 p-6 flex gap-5 hover:border-brand-200 hover:shadow-soft transition bg-white group">
                    <div className="relative h-20 w-20 shrink-0 rounded-2xl overflow-hidden bg-ink-100">
                      {d.profileImageUrl ? (
                        <Image src={d.profileImageUrl} alt={`${d.firstName} ${d.lastName}`} fill unoptimized className="object-cover" sizes="80px" />
                      ) : (
                        <div className="h-full w-full bg-brand-50 grid place-items-center"><Stethoscope className="h-8 w-8 text-brand-400" /></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-display font-bold text-ink-900">Dr. {d.firstName} {d.lastName}</p>
                          {d.specialization && <p className="text-sm text-brand-700 font-medium">{d.specialization.trim()}</p>}
                        </div>
                        <ChevronRight className="h-4 w-4 text-ink-400 group-hover:text-brand-600 group-hover:translate-x-0.5 transition" />
                      </div>
                      {d.experienceYears && <p className="text-xs text-ink-500 mt-1">{d.experienceYears}+ years experience</p>}
                      {d.bio && <p className="mt-3 text-sm text-ink-500 line-clamp-2">{d.bio}</p>}
                      <p className="mt-3 text-xs font-semibold text-brand-600">Tap to see full profile &rarr;</p>
                    </div>
                  </button>
                ))}
              </div>
            </Container>
          </section>

          {/* GALLERY — aggregate from all services */}
          <section id="gallery" className="scroll-mt-32 mt-16">
            <Container>
              <Eyebrow>Before / After</Eyebrow>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-ink-900">Real patient results</h2>
              <p className="mt-2 text-ink-500 text-sm">Unedited transformations across all treatments. Click any image for a closer look.</p>
              <AggregateGallery services={clinic.services ?? []} onImageClick={(src, caption) => setLightbox({ src, caption })} />
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

          {/* Related */}
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
              <Button onClick={openLead} className="w-full mt-5" size="lg" data-testid="clinic-book-rail"><Calendar className="h-4 w-4" /> Book Consultation</Button>
              <a href="https://wa.me/918650801405" target="_blank" rel="noopener" className="mt-2 flex items-center justify-center gap-2 rounded-full border-2 border-ink-200 text-ink-800 font-semibold h-11 text-sm hover:border-brand-400 hover:text-brand-600 transition">Chat on WhatsApp</a>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-ink-100 p-3 flex gap-2 shadow-[0_-8px_24px_-6px_rgba(0,0,0,0.08)]" data-testid="clinic-mobile-book-bar">
        <a href="tel:+918650801405" className="grid place-items-center h-12 w-12 rounded-full border border-ink-200 text-ink-800"><Phone className="h-5 w-5" /></a>
        <Button onClick={openLead} size="lg" className="flex-1" data-testid="clinic-book-mobile"><Calendar className="h-4 w-4" /> Book Consultation</Button>
      </div>

      <Lightbox image={lightbox} onClose={() => setLightbox(null)} />
      <DoctorModal doctor={doctorOpen} onClose={() => setDoctorOpen(null)} onOpenPhoto={(src) => setLightbox({ src, caption: doctorOpen ? `Dr. ${doctorOpen.firstName} ${doctorOpen.lastName}` : "" })} />
    </div>
  );
}

function AggregateGallery({ services, onImageClick }: { services: import("@/lib/api.server").ClinicService[]; onImageClick: (src: string, caption?: string) => void }) {
  const all = services.flatMap((s) => (s.beforeAfterImages ?? []).map((img) => ({ ...img, serviceName: s.serviceName ?? s.service?.name ?? "" })));
  if (all.length === 0) return <p className="mt-6 text-ink-400 text-sm rounded-2xl border border-dashed border-ink-200 p-8 text-center">Transformation photos will be uploaded soon.</p>;
  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
      {all.flatMap((img, i) => ([
        <button key={`b-${img.id}-${i}`} type="button" onClick={() => onImageClick(img.beforeImageUrl, `${img.serviceName} — Before`)}
          data-testid={`gallery-before-${i}`} className="relative aspect-square rounded-xl overflow-hidden bg-ink-100 group cursor-zoom-in">
          <Image src={img.beforeImageUrl} alt="Before" fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:768px) 50vw, 25vw" />
          <span className="absolute top-2 left-2 text-[10px] font-bold tracking-widest uppercase text-white bg-ink-900/85 rounded-full px-2 py-0.5">Before</span>
        </button>,
        <button key={`a-${img.id}-${i}`} type="button" onClick={() => onImageClick(img.afterImageUrl, `${img.serviceName} — After`)}
          data-testid={`gallery-after-${i}`} className="relative aspect-square rounded-xl overflow-hidden bg-ink-100 group cursor-zoom-in">
          <Image src={img.afterImageUrl} alt="After" fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:768px) 50vw, 25vw" />
          <span className="absolute top-2 left-2 text-[10px] font-bold tracking-widest uppercase text-white bg-accent-mint/90 rounded-full px-2 py-0.5">After</span>
        </button>
      ]))}
    </div>
  );
}
