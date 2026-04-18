import { sGetCities, sDiscoverClinics } from "@/lib/api.server";
import Hero from "@/components/home/Hero";
import Treatments from "@/components/home/Treatments";
import ClinicsShowcase from "@/components/home/ClinicsShowcase";
import WhyUs, { CTABand } from "@/components/home/WhyUs";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [cities, clinics] = await Promise.all([sGetCities(), sDiscoverClinics(1)]);
  return (
    <>
      <Hero initialCities={cities} />
      <Treatments />
      <ClinicsShowcase initialClinics={clinics.slice(0, 6)} />
      <WhyUs />
      <CTABand />
    </>
  );
}
