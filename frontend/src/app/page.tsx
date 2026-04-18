import Hero from "@/components/home/Hero";
import Treatments from "@/components/home/Treatments";
import ClinicsShowcase from "@/components/home/ClinicsShowcase";
import WhyUs, { CTABand } from "@/components/home/WhyUs";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Treatments />
      <ClinicsShowcase />
      <WhyUs />
      <CTABand />
    </>
  );
}
