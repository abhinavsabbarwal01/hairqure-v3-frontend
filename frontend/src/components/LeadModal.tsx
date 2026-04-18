"use client";
import { useState, useEffect } from "react";
import { MessageCircle, X, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { submitHairIssueForm, getCities, type City } from "@/lib/api";

const issues = ["Hair Loss", "Thinning", "Dandruff", "Bald Patches", "Damage", "Other"];

export default function LeadModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [issue, setIssue] = useState("");
  const [cityName, setCityName] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { if (open && cities.length === 0) getCities().then(r => setCities(r?.data ?? [])).catch(() => {}); }, [open, cities.length]);

  const submit = async () => {
    setSubmitting(true);
    try {
      await submitHairIssueForm({ name, age: 25, gender: "NOT_SPECIFIED", phone, issue_type: issue, city: cityName });
      setDone(true);
    } catch {} finally { setSubmitting(false); }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        data-testid="floating-cta"
        className="fixed bottom-5 right-5 z-40 md:hidden flex items-center gap-2 rounded-full bg-brand-600 text-white px-5 py-3 shadow-glow font-semibold text-sm hover:bg-brand-700 transition"
      >
        <MessageCircle className="h-4 w-4" /> Free Consultation
      </button>
      <button
        onClick={() => setOpen(true)}
        data-testid="floating-cta-desktop"
        className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 rounded-full bg-brand-600 text-white px-6 py-4 shadow-glow font-semibold hover:-translate-y-0.5 hover:bg-brand-700 transition"
      >
        <MessageCircle className="h-5 w-5" /> Free Consultation
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-ink-900/60 backdrop-blur-sm grid place-items-center p-4" data-testid="lead-modal">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 relative shadow-glow animate-fade-up">
            <button onClick={() => { setOpen(false); setStep(1); setDone(false); }} className="absolute top-4 right-4 text-ink-400 hover:text-ink-900"><X className="h-5 w-5" /></button>

            {done ? (
              <div className="text-center py-6">
                <div className="h-14 w-14 rounded-full bg-accent-mint/20 grid place-items-center mx-auto"><Check className="h-7 w-7 text-accent-mint" /></div>
                <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">You&rsquo;re all set!</h3>
                <p className="mt-2 text-ink-500">Our team will reach out within 24 hours.</p>
                <Button className="mt-6 w-full" onClick={() => { setOpen(false); setStep(1); setDone(false); }}>Close</Button>
              </div>
            ) : (
              <>
                <div className="flex gap-1.5 mb-5">{[1,2,3].map(s => <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= step ? "bg-brand-600" : "bg-ink-100"}`} />)}</div>
                {step === 1 && (
                  <>
                    <h3 className="font-display text-2xl font-bold text-ink-900">What&rsquo;s your concern?</h3>
                    <div className="mt-5 grid grid-cols-2 gap-2">
                      {issues.map(i => (
                        <button key={i} onClick={() => { setIssue(i); setStep(2); }} data-testid={`issue-${i.toLowerCase().replace(/\s/g,"-")}`}
                          className={`text-left px-4 py-3 rounded-2xl border font-medium transition ${issue===i ? "border-brand-600 bg-brand-50 text-brand-700" : "border-ink-200 hover:border-brand-300"}`}>{i}</button>
                      ))}
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <h3 className="font-display text-2xl font-bold text-ink-900">Which city?</h3>
                    <select value={cityName} onChange={e => setCityName(e.target.value)} data-testid="lead-city"
                      className="mt-5 w-full rounded-2xl border border-ink-200 px-4 py-3 font-medium focus-ring">
                      <option value="">Select city</option>
                      {cities.map(c => <option key={String(c.cityId)} value={c.cityName}>{c.cityName}</option>)}
                    </select>
                    <div className="mt-6 flex gap-2">
                      <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                      <Button className="flex-1" disabled={!cityName} onClick={() => setStep(3)} data-testid="lead-next-2">Continue <ChevronRight className="h-4 w-4" /></Button>
                    </div>
                  </>
                )}
                {step === 3 && (
                  <>
                    <h3 className="font-display text-2xl font-bold text-ink-900">Almost done.</h3>
                    <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" data-testid="lead-name"
                      className="mt-5 w-full rounded-2xl border border-ink-200 px-4 py-3 focus-ring" />
                    <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number" inputMode="tel" data-testid="lead-phone"
                      className="mt-3 w-full rounded-2xl border border-ink-200 px-4 py-3 focus-ring" />
                    <div className="mt-6 flex gap-2">
                      <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                      <Button className="flex-1" disabled={!name || phone.length < 10 || submitting} onClick={submit} data-testid="lead-submit">
                        {submitting ? "Sending..." : "Book Free Consult"}
                      </Button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
