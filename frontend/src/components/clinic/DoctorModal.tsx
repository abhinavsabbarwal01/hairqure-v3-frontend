"use client";
import { useEffect } from "react";
import Image from "next/image";
import { X, Award, GraduationCap, Trophy, Expand, Stethoscope } from "lucide-react";
import type { Doctor } from "@/lib/api.server";
import { Button } from "@/components/ui/Button";

export default function DoctorModal({ doctor, onClose, onOpenPhoto }: { doctor: Doctor | null; onClose: () => void; onOpenPhoto: (src: string) => void }) {
  useEffect(() => {
    if (!doctor) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [doctor, onClose]);

  if (!doctor) return null;
  const d = doctor;
  return (
    <div className="fixed inset-0 z-[55] flex items-end sm:items-center justify-center p-0 sm:p-4" data-testid="doctor-modal" onClick={onClose}>
      <div className="absolute inset-0 bg-ink-900/70 backdrop-blur-md" />
      <div className="relative w-full sm:max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl shadow-glow max-h-[92vh] overflow-hidden flex flex-col animate-fade-up" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 pt-5 pb-4 flex items-start justify-between shrink-0 border-b border-ink-100">
          <div>
            <p className="text-[11px] font-semibold tracking-widest text-brand-600 uppercase">Specialist profile</p>
            <h3 className="mt-1 font-display text-xl font-bold text-ink-900">Dr. {d.firstName} {d.lastName}</h3>
            {d.specialization && <p className="text-sm text-brand-700 font-medium">{d.specialization.trim()}</p>}
          </div>
          <button onClick={onClose} aria-label="Close" className="p-2 -mr-2 text-ink-400 hover:text-ink-800 rounded-full hover:bg-ink-50"><X className="h-5 w-5" /></button>
        </div>

        <div className="overflow-y-auto">
          <div className="px-6 pt-6 flex gap-5">
            <button type="button" onClick={() => d.profileImageUrl && onOpenPhoto(d.profileImageUrl)}
              className="relative h-28 w-28 sm:h-32 sm:w-32 shrink-0 rounded-2xl overflow-hidden bg-ink-100 group cursor-zoom-in">
              {d.profileImageUrl ? (
                <>
                  <Image src={d.profileImageUrl} alt={`${d.firstName} ${d.lastName}`} fill unoptimized className="object-cover" sizes="128px" />
                  <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/30 transition grid place-items-center">
                    <Expand className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </>
              ) : (
                <div className="h-full w-full grid place-items-center"><Stethoscope className="h-10 w-10 text-brand-400" /></div>
              )}
            </button>
            <div className="flex-1 min-w-0">
              {d.experienceYears && (
                <div className="rounded-xl bg-brand-50 border border-brand-100 px-4 py-3 inline-flex items-center gap-2">
                  <Award className="h-4 w-4 text-brand-600" />
                  <span className="font-bold text-ink-900">{d.experienceYears}+ years</span>
                  <span className="text-ink-500 text-sm">of experience</span>
                </div>
              )}
              {d.bio && <p className="mt-4 text-ink-600 text-sm leading-relaxed">{d.bio}</p>}
            </div>
          </div>

          <div className="px-6 py-6 space-y-6">
            {(d.qualifications ?? []).length > 0 && (
              <Section title="Qualifications" icon={GraduationCap}>
                <ul className="space-y-2">
                  {d.qualifications!.map((q) => (
                    <li key={q.id} className="flex items-start gap-3 text-sm">
                      <span className="h-1.5 w-1.5 mt-2 rounded-full bg-brand-500 shrink-0" />
                      <span><span className="font-semibold text-ink-900">{q.degree}</span>{q.institution && <span className="text-ink-500"> · {q.institution}</span>}{q.year ? <span className="text-ink-400"> · {q.year}</span> : null}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}
            {(d.achievements ?? []).length > 0 && (
              <Section title="Achievements" icon={Trophy}>
                <ul className="space-y-2">
                  {d.achievements!.map((a) => (
                    <li key={a.id} className="flex items-start gap-3 text-sm">
                      <span className="h-1.5 w-1.5 mt-2 rounded-full bg-accent-mint shrink-0" />
                      <span><span className="font-semibold text-ink-900">{a.title.trim()}</span>{a.description && a.description.trim() !== a.title.trim() && <span className="text-ink-500"> · {a.description.trim()}</span>}{a.year ? <span className="text-ink-400"> · {a.year}</span> : null}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}
            {(d.certifications ?? []).length > 0 && (
              <Section title="Certifications" icon={Award}>
                <div className="flex flex-wrap gap-1.5">
                  {d.certifications!.map((c) => (
                    <span key={c.id} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {c.name.trim()}{c.issuingBody && ` · ${c.issuingBody}`}
                    </span>
                  ))}
                </div>
              </Section>
            )}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-ink-100 flex gap-2 bg-white shrink-0">
          <Button variant="outline" onClick={onClose} className="flex-1">Close</Button>
          <Button className="flex-1" onClick={() => { onClose(); (document.querySelector('[data-testid="floating-cta-desktop"]') as HTMLButtonElement | null)?.click(); }}>Book with Dr. {d.firstName}</Button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div>
      <p className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-brand-600 uppercase"><Icon className="h-3.5 w-3.5" /> {title}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}
