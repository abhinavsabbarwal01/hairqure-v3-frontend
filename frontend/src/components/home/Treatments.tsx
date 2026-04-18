"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Scissors, Sparkles, FlaskConical, ArrowRight } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/Layout";

const items = [
  { icon: Scissors, title: "Hair Transplant", desc: "Advanced FUE & DHI for natural-looking, permanent restoration.", tint: "from-brand-500 to-brand-700" },
  { icon: Sparkles, title: "PRP Therapy", desc: "Platelet-rich plasma stimulation for faster regrowth with no downtime.", tint: "from-accent-mint to-brand-500" },
  { icon: FlaskConical, title: "GFC Treatment", desc: "Growth Factor Concentrate therapy for follicle regeneration.", tint: "from-accent-amber to-accent-rose" },
];

export default function Treatments() {
  return (
    <Section className="bg-white">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Treatments</Eyebrow>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900">Proven solutions, personalized to you.</h2>
          <p className="mt-4 text-ink-500 text-lg">From surgical restoration to regenerative therapies, explore what&rsquo;s available at top clinics near you.</p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative rounded-3xl p-8 bg-white border border-ink-100 hover:border-brand-300 transition-all hover:shadow-soft"
              data-testid={`treatment-${it.title.toLowerCase().replace(/\s/g, "-")}`}
            >
              <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${it.tint} grid place-items-center text-white shadow-glow`}>
                <it.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-ink-900">{it.title}</h3>
              <p className="mt-2 text-ink-500">{it.desc}</p>
              <Link href="/clinics" className="mt-6 inline-flex items-center gap-1 text-brand-600 font-semibold text-sm group-hover:gap-2 transition-all">
                Find clinics <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
