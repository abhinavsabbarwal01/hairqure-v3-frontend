"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, MapPin, ArrowRight, Award } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { discoverClinics, type Clinic } from "@/lib/api";
import { slugify } from "@/lib/utils";

export default function ClinicsShowcase() {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    discoverClinics(1)
      .then((d) => setClinics((d ?? []).slice(0, 6)))
      .catch(() => setClinics([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Section className="bg-ink-50" id="clinics">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-xl">
            <Eyebrow>Top clinics</Eyebrow>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900">Hand-picked, verified clinics in Delhi NCR.</h2>
          </div>
          <Link href="/clinics"><Button variant="outline" data-testid="view-all-clinics">View all clinics <ArrowRight className="h-4 w-4" /></Button></Link>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-3xl bg-white p-5 border border-ink-100">
              <div className="skeleton h-44 rounded-2xl" />
              <div className="skeleton h-5 w-2/3 mt-4 rounded-full" />
              <div className="skeleton h-4 w-1/2 mt-2 rounded-full" />
            </div>
          ))}
          {!loading && clinics.length === 0 && (
            <p className="col-span-full text-center text-ink-500 py-10">Clinics will appear here once the API responds.</p>
          )}
          {clinics.map((c, i) => {
            const id = c.clinicId ?? c.id ?? i;
            const city = c.cityName ?? c.city ?? "delhi";
            const slug = `${slugify(c.name)}-${id}`;
            const img = c.thumbnailUrls?.[0] ?? c.imageUrl ?? c.image;
            const rating = c.averageRating ?? c.rating ?? 4.7;
            const services = (c.treatments ?? c.services ?? ["Hair Transplant", "PRP", "GFC"]).slice(0, 3);
            return (
              <motion.div
                key={String(id) + i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link
                  href={`/clinic/${slugify(String(city))}/${slug}`}
                  className="group block rounded-3xl bg-white overflow-hidden border border-ink-100 hover:border-brand-300 hover:shadow-soft transition-all"
                  data-testid={`clinic-card-${i}`}
                >
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
                    <p className="mt-1 flex items-center gap-1 text-sm text-ink-500"><MapPin className="h-3.5 w-3.5" /> {c.address ?? String(city)}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {services.map((s) => (
                        <span key={s} className="text-xs font-medium px-2.5 py-1 rounded-full bg-brand-50 text-brand-700">{s}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
