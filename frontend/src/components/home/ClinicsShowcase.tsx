import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, ArrowRight, Award } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import type { Clinic } from "@/lib/api.server";
import { slugify } from "@/lib/utils";

export default function ClinicsShowcase({ initialClinics = [] }: { initialClinics?: Clinic[] }) {
  return (
    <Section className="bg-brand-50/70" id="clinics">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-xl">
            <Eyebrow>Top clinics</Eyebrow>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900">Hand-picked, verified clinics in Delhi NCR.</h2>
          </div>
          <Link href="/clinics" className="hidden md:block"><Button variant="outline" data-testid="view-all-clinics">View all clinics <ArrowRight className="h-4 w-4" /></Button></Link>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialClinics.length === 0 && (
            <p className="col-span-full text-center text-ink-500 py-10">Clinics coming soon.</p>
          )}
          {initialClinics.map((c, i) => {
            const id = c.clinicId ?? c.id ?? i;
            const city = c.cityName ?? c.city ?? "delhi";
            const slug = `${slugify(c.name)}-${id}`;
            const img = c.thumbnailUrls?.[0] ?? c.imageUrl ?? c.image;
            const rating = c.averageRating ?? c.rating ?? 4.7;
            const services = (c.treatments ?? c.services ?? ["Hair Transplant", "PRP", "GFC"]).slice(0, 3);
            // Mobile: show only first 2 clinics. Tablet/Desktop: show all.
            const mobileHide = i >= 2 ? "hidden sm:block" : "";
            return (
              <Link key={String(id) + i} href={`/clinic/${slugify(String(city))}/${slug}`}
                data-testid={`home-clinic-${i}`}
                className={`group block rounded-3xl bg-white overflow-hidden border border-ink-100 hover:border-brand-300 hover:shadow-soft transition-all ${mobileHide}`}>
                <div className="relative h-48 bg-ink-100 overflow-hidden">
                  {img ? (
                    <Image src={img} alt={c.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:768px) 100vw, 33vw" unoptimized />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-brand-100 to-brand-50 grid place-items-center"><Award className="h-10 w-10 text-brand-400" /></div>
                  )}
                  <div className="absolute top-3 left-3 rounded-full bg-white/95 backdrop-blur px-3 py-1 text-xs font-bold text-ink-900 flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-accent-amber text-accent-amber" /> {Number(rating).toFixed(1)}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-ink-900 group-hover:text-brand-600 transition-colors">{c.name}</h3>
                  <p className="mt-1 flex items-center gap-1 text-sm text-ink-500"><MapPin className="h-3.5 w-3.5" /><span className="line-clamp-1">{c.address ?? c.areaName ?? String(city)}</span></p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {services.map((s) => (
                      <span key={s} className="text-xs font-medium px-2.5 py-1 rounded-full bg-brand-50 text-brand-700">{s}</span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile-only "View all" CTA below the 2 visible clinics */}
        <div className="mt-8 sm:hidden">
          <Link href="/clinics" data-testid="mobile-view-all-clinics">
            <Button variant="outline" className="w-full">View all clinics <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
