"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, Star, SlidersHorizontal, Award } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Section, Eyebrow } from "@/components/ui/Layout";
import { discoverClinics, getCities, type Clinic, type City } from "@/lib/api";
import { slugify } from "@/lib/utils";

const chips = ["All", "Hair Transplant", "PRP", "GFC", "Scalp", "Consultation"];

export default function ClinicsClient() {
  const [cities, setCities] = useState<City[]>([]);
  const [cityId, setCityId] = useState<string | number>(1);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [chip, setChip] = useState("All");
  const [sort, setSort] = useState("rating");

  useEffect(() => { getCities().then(r => setCities(r?.data ?? [])).catch(() => {}); }, []);

  useEffect(() => {
    setLoading(true);
    discoverClinics(cityId).then(d => setClinics(d ?? [])).catch(() => setClinics([])).finally(() => setLoading(false));
  }, [cityId]);

  const filtered = useMemo(() => {
    let list = clinics.filter(c => c.name?.toLowerCase().includes(q.toLowerCase()));
    if (chip !== "All") list = list.filter(c => (c.treatments ?? c.services ?? []).some(s => s.toLowerCase().includes(chip.toLowerCase())));
    if (sort === "rating") list = [...list].sort((a, b) => (Number(b.averageRating ?? b.rating ?? 0)) - (Number(a.averageRating ?? a.rating ?? 0)));
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [clinics, q, chip, sort]);

  return (
    <Section className="bg-ink-50 min-h-screen">
      <Container>
        <Eyebrow>Clinics</Eyebrow>
        <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900">Find the right clinic near you.</h1>
        <p className="mt-3 text-ink-500 max-w-xl">Browse verified clinics, compare ratings and treatments, and book a free consultation.</p>

        <div className="mt-8 grid lg:grid-cols-[2fr_1fr_1fr] gap-3 p-3 bg-white rounded-3xl shadow-soft border border-ink-100">
          <div className="flex items-center gap-2 px-3 border border-ink-100 rounded-2xl">
            <Search className="h-4 w-4 text-ink-400" />
            <input data-testid="clinics-search" value={q} onChange={e => setQ(e.target.value)} placeholder="Search clinics..." className="w-full py-3 bg-transparent focus:outline-none text-sm" />
          </div>
          <div className="flex items-center gap-2 px-3 border border-ink-100 rounded-2xl">
            <MapPin className="h-4 w-4 text-brand-600" />
            <select data-testid="clinics-city" value={String(cityId)} onChange={e => setCityId(e.target.value)} className="w-full py-3 bg-transparent focus:outline-none text-sm font-medium">
              {cities.length === 0 && <option value="1">Delhi</option>}
              {cities.map(c => <option key={String(c.cityId)} value={String(c.cityId)}>{c.cityName}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2 px-3 border border-ink-100 rounded-2xl">
            <SlidersHorizontal className="h-4 w-4 text-ink-400" />
            <select data-testid="clinics-sort" value={sort} onChange={e => setSort(e.target.value)} className="w-full py-3 bg-transparent focus:outline-none text-sm">
              <option value="rating">Top rated</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {chips.map(c => (
            <button key={c} onClick={() => setChip(c)} data-testid={`chip-${slugify(c)}`}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${chip === c ? "bg-brand-600 text-white shadow-glow" : "bg-white border border-ink-200 text-ink-700 hover:border-brand-400"}`}>
              {c}
            </button>
          ))}
        </div>

        <p className="mt-6 text-sm text-ink-500">{loading ? "Loading..." : `${filtered.length} clinic${filtered.length === 1 ? "" : "s"} found`}</p>

        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-3xl bg-white p-5 border border-ink-100"><div className="skeleton h-44 rounded-2xl" /><div className="skeleton h-5 w-2/3 mt-4 rounded-full" /></div>
          ))}
          {!loading && filtered.map((c, i) => {
            const id = c.clinicId ?? c.id ?? i;
            const city = c.cityName ?? c.city ?? "delhi";
            const slug = `${slugify(c.name)}-${id}`;
            const img = c.thumbnailUrls?.[0] ?? c.imageUrl ?? c.image;
            const rating = c.averageRating ?? c.rating ?? 4.7;
            const services = (c.treatments ?? c.services ?? ["Hair Transplant","PRP","GFC"]).slice(0, 3);
            return (
              <Link key={String(id)+i} href={`/clinic/${slugify(String(city))}/${slug}`} data-testid={`clinic-${i}`}
                className="group block rounded-3xl bg-white overflow-hidden border border-ink-100 hover:border-brand-300 hover:shadow-soft transition-all">
                <div className="relative h-48 bg-ink-100 overflow-hidden">
                  {img ? <Image src={img} alt={c.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:768px) 100vw, 33vw" unoptimized />
                    : <div className="h-full w-full bg-gradient-to-br from-brand-100 to-brand-50 grid place-items-center"><Award className="h-10 w-10 text-brand-400" /></div>}
                  <div className="absolute top-3 left-3 rounded-full bg-white/95 backdrop-blur px-3 py-1 text-xs font-bold text-ink-900 flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-accent-amber text-accent-amber" /> {Number(rating).toFixed(1)}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-ink-900 group-hover:text-brand-600 transition-colors">{c.name}</h3>
                  <p className="mt-1 flex items-center gap-1 text-sm text-ink-500"><MapPin className="h-3.5 w-3.5" /> {c.address ?? String(city)}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {services.map(s => <span key={s} className="text-xs font-medium px-2.5 py-1 rounded-full bg-brand-50 text-brand-700">{s}</span>)}
                  </div>
                </div>
              </Link>
            );
          })}
          {!loading && filtered.length === 0 && <p className="col-span-full text-center text-ink-500 py-10">No clinics match your filters.</p>}
        </div>
      </Container>
    </Section>
  );
}
