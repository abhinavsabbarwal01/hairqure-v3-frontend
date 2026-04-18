"use client";
import Link from "next/link";
import { ShieldCheck, BadgeCheck, DollarSign, Camera, Users, Microscope } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Section, Eyebrow } from "@/components/ui/Layout";

const reasons = [
  { icon: BadgeCheck, title: "Verified clinics only", desc: "Every clinic audited for licenses, certifications & outcomes.", color: "text-brand-600 bg-brand-50" },
  { icon: DollarSign, title: "Transparent pricing", desc: "No hidden fees. Compare treatment costs before you book.", color: "text-accent-mint bg-accent-mint/10" },
  { icon: Camera, title: "Real before/after", desc: "Authentic patient results. No filters, no stock photos.", color: "text-accent-amber bg-accent-amber/10" },
  { icon: Users, title: "Genuine reviews", desc: "Thousands of verified patient reviews across NCR.", color: "text-accent-rose bg-accent-rose/10" },
  { icon: Microscope, title: "Certified specialists", desc: "Trichologists and surgeons with 5-20+ years of experience.", color: "text-brand-600 bg-brand-50" },
  { icon: ShieldCheck, title: "Privacy-first", desc: "Your consultations and data are protected end-to-end.", color: "text-accent-mint bg-accent-mint/10" },
];

export default function WhyUs() {
  return (
    <Section className="bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow>Why HairQure</Eyebrow>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900">Built on trust. Engineered for outcomes.</h2>
          <p className="mt-4 text-ink-500 text-lg">We only partner with clinics that meet our strict quality standards so you can decide with confidence.</p>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r) => (
            <div key={r.title}
              className="rounded-3xl p-7 bg-white border border-ink-100 hover:border-brand-200 hover:shadow-soft transition-all animate-fade-up">
              <div className={`h-12 w-12 rounded-2xl ${r.color} grid place-items-center`}><r.icon className="h-6 w-6" /></div>
              <h3 className="mt-5 font-display text-lg font-bold text-ink-900">{r.title}</h3>
              <p className="mt-2 text-ink-500 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function CTABand() {
  return (
    <Section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-ink-900 text-white">
      <div className="orb bg-accent-mint h-80 w-80 -top-10 -left-10 opacity-30" />
      <div className="orb bg-accent-amber h-80 w-80 -bottom-20 -right-10 opacity-25" />
      <Container>
        <div className="relative grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Eyebrow>Ready to begin?</Eyebrow>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">Your personalized hair journey starts with a free consultation.</h2>
            <p className="mt-5 text-white/80 text-lg">Tell us about your concern and we&rsquo;ll match you with the right specialists near you &mdash; usually within 24 hours.</p>
          </div>
          <div className="flex flex-col sm:flex-row md:justify-end gap-3">
            <Link href="/clinics"><Button size="lg" variant="secondary" data-testid="cta-find">Find Clinics</Button></Link>
            <a href="https://wa.me/918650801405" target="_blank" rel="noopener"><Button size="lg" className="bg-white text-brand-700 hover:bg-ink-50" data-testid="cta-wa">Chat on WhatsApp</Button></a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
