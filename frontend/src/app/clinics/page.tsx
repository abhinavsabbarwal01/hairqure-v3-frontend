import { sGetCities, sDiscoverClinics } from "@/lib/api.server";
import ClinicsClient from "@/components/clinics/ClinicsClient";

export const metadata = {
  title: "Find Hair Clinics in Delhi NCR",
  description: "Browse verified hair clinics, compare ratings, filter by treatment, and book free consultations.",
};

export const dynamic = "force-dynamic";

export default async function ClinicsPage({ searchParams }: { searchParams: Promise<{ city?: string }> }) {
  const sp = await searchParams;
  const [cities, initialClinics] = await Promise.all([sGetCities(), sDiscoverClinics(1)]);
  return <ClinicsClient initialCities={cities} initialClinics={initialClinics} initialCitySlug={sp.city} />;
}
