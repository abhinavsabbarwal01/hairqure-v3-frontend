"use client";
import { useState, useEffect } from "react";
import { MessageCircle, X, ChevronRight, Check, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { submitHairIssueForm } from "@/lib/api";

type IssueType = "HAIRFALL" | "HAIR_THINNING" | "DANDRUFF" | "BALD_PATCHES" | "OTHER";
type Gender = "MALE" | "FEMALE" | "OTHER";

interface FormData {
  name: string;
  age: string;
  gender: Gender;
  phone: string;
  issue_type: IssueType;
  issue_description: string;
  issue_duration: string;
  city: string;
}

const issueOptions: { value: IssueType; label: string }[] = [
  { value: "HAIRFALL", label: "Hair Fall" },
  { value: "HAIR_THINNING", label: "Hair Thinning" },
  { value: "DANDRUFF", label: "Dandruff" },
  { value: "BALD_PATCHES", label: "Bald Patches" },
  { value: "OTHER", label: "Other" },
];
const durationOptions = ["Less than 3 months", "3-6 months", "6-12 months", "1-2 years", "More than 2 years"];
const cityOptions = ["Delhi", "Gurgaon", "Noida", "Faridabad", "Ghaziabad", "Mumbai", "Bangalore", "Hyderabad"];

const defaultData: FormData = {
  name: "", age: "", gender: "MALE", phone: "",
  issue_type: "HAIRFALL", issue_description: "", issue_duration: "", city: "",
};

export default function LeadModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(defaultData);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const totalSteps = 3;

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  const reset = () => { setForm(defaultData); setStep(1); setDone(false); setConfirmCancel(false); };
  const set = <K extends keyof FormData>(k: K, v: FormData[K]) => setForm((f) => ({ ...f, [k]: v }));

  const step1Valid = form.name.trim().length > 1 && Number(form.age) >= 12 && Number(form.age) <= 99 && form.phone.length === 10;
  const step2Valid = !!form.issue_type && !!form.issue_duration && (form.issue_type !== "OTHER" || form.issue_description.trim().length > 3);
  const step3Valid = !!form.city;

  const post = async (partial = false) => {
    try {
      await submitHairIssueForm({
        name: form.name,
        age: parseInt(form.age) || 0,
        gender: form.gender,
        phone: form.phone,
        issue_type: form.issue_type,
        issue_description: form.issue_description || undefined,
        issue_duration: form.issue_duration || undefined,
        city: form.city,
        is_partial: partial,
      });
    } catch (e) { console.error("lead submit err", e); }
  };

  const onFinalSubmit = async () => {
    setSubmitting(true);
    await post(false);
    setSubmitting(false);
    setDone(true);
  };

  // Partial-capture on close after step 1 (matches prod behavior)
  const closeWithCapture = async () => {
    if (!done && step > 1 && step1Valid) {
      post(true); // fire-and-forget, don't block UX
    }
    setOpen(false);
    setTimeout(reset, 300);
  };

  const requestClose = () => {
    if (done || step === 1) { setOpen(false); setTimeout(reset, 300); return; }
    if (step1Valid) setConfirmCancel(true);
    else { setOpen(false); setTimeout(reset, 300); }
  };

  return (
    <>
      {/* Floating CTA — opens modal */}
      <button onClick={() => setOpen(true)} data-testid="floating-cta"
        className="fixed bottom-5 right-5 z-30 md:hidden flex items-center gap-2 rounded-full bg-brand-600 text-white px-5 py-3 shadow-glow font-semibold text-sm hover:bg-brand-700 transition">
        <MessageCircle className="h-4 w-4" /> Free Consultation
      </button>
      <button onClick={() => setOpen(true)} data-testid="floating-cta-desktop"
        className="fixed bottom-6 right-6 z-30 hidden md:flex items-center gap-2 rounded-full bg-brand-600 text-white px-6 py-4 shadow-glow font-semibold hover:-translate-y-0.5 hover:bg-brand-700 transition">
        <MessageCircle className="h-5 w-5" /> Free Consultation
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" data-testid="lead-modal">
          <div className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm" onClick={requestClose} />
          <div className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-glow animate-fade-up max-h-[92vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="px-6 pt-5 pb-4 border-b border-ink-100 flex items-center justify-between shrink-0">
              <div>
                <p className="text-[11px] font-semibold tracking-widest text-brand-600 uppercase">Free Consultation</p>
                <h3 className="mt-1 font-display text-lg font-bold text-ink-900">
                  {done ? "You're all set!" : step === 1 ? "Tell us about yourself" : step === 2 ? "Understanding your concern" : "Where are you located?"}
                </h3>
              </div>
              <button onClick={requestClose} aria-label="Close" className="p-2 -mr-2 text-ink-400 hover:text-ink-800 rounded-full hover:bg-ink-50"><X className="h-5 w-5" /></button>
            </div>

            {/* Progress */}
            {!done && (
              <div className="px-6 pt-4 shrink-0">
                <div className="flex gap-1.5">
                  {[1, 2, 3].map((s) => <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? "bg-brand-600" : "bg-ink-100"}`} />)}
                </div>
                <p className="mt-2 text-xs text-ink-400">Step {step} of {totalSteps}</p>
              </div>
            )}

            {/* Body — scrollable */}
            <div className="px-6 py-5 overflow-y-auto flex-1">
              {done ? (
                <div className="py-6 text-center">
                  <div className="h-16 w-16 rounded-full bg-accent-mint/15 grid place-items-center mx-auto"><Check className="h-8 w-8 text-accent-mint" /></div>
                  <p className="mt-5 text-ink-500">Thanks, {form.name || "friend"}. Our team will reach out on <span className="font-semibold text-ink-800">+91 {form.phone}</span> within 24 hours to match you with the right specialist.</p>
                </div>
              ) : step === 1 ? (
                <div className="space-y-4">
                  <Field label="Full name" required>
                    <input data-testid="lead-name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name"
                      className="w-full rounded-xl border border-ink-200 px-4 py-3 focus-ring focus:border-brand-400" />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Age" required>
                      <input data-testid="lead-age" value={form.age} onChange={(e) => set("age", e.target.value.replace(/\D/g, "").slice(0, 2))} placeholder="28" inputMode="numeric"
                        className="w-full rounded-xl border border-ink-200 px-4 py-3 focus-ring focus:border-brand-400" />
                    </Field>
                    <Field label="Gender" required>
                      <div className="grid grid-cols-3 gap-1.5">
                        {(["MALE", "FEMALE", "OTHER"] as Gender[]).map((g) => (
                          <button key={g} type="button" onClick={() => set("gender", g)} data-testid={`lead-gender-${g.toLowerCase()}`}
                            className={`py-3 rounded-xl text-xs font-semibold border transition ${form.gender === g ? "border-brand-600 bg-brand-50 text-brand-700" : "border-ink-200 text-ink-600 hover:border-brand-300"}`}>
                            {g[0] + g.slice(1).toLowerCase()}
                          </button>
                        ))}
                      </div>
                    </Field>
                  </div>
                  <Field label="Phone number" required help="We'll call you within 24 hours">
                    <div className="flex rounded-xl border border-ink-200 overflow-hidden focus-within:border-brand-400">
                      <span className="grid place-items-center px-4 bg-ink-50 text-ink-600 font-medium text-sm border-r border-ink-200">+91</span>
                      <input data-testid="lead-phone" value={form.phone} onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                        placeholder="10-digit mobile" inputMode="numeric" className="flex-1 px-4 py-3 focus:outline-none" />
                    </div>
                  </Field>
                </div>
              ) : step === 2 ? (
                <div className="space-y-4">
                  <Field label="What's your primary concern?" required>
                    <div className="grid grid-cols-2 gap-2">
                      {issueOptions.map((o) => (
                        <button key={o.value} type="button" onClick={() => set("issue_type", o.value)} data-testid={`lead-issue-${o.value}`}
                          className={`text-left px-4 py-3 rounded-xl text-sm font-semibold border transition ${form.issue_type === o.value ? "border-brand-600 bg-brand-50 text-brand-700" : "border-ink-200 text-ink-700 hover:border-brand-300"}`}>
                          {o.label}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label="How long have you had this concern?" required>
                    <select data-testid="lead-duration" value={form.issue_duration} onChange={(e) => set("issue_duration", e.target.value)}
                      className="w-full rounded-xl border border-ink-200 px-4 py-3 focus-ring focus:border-brand-400 bg-white">
                      <option value="">Select duration</option>
                      {durationOptions.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </Field>
                  <Field label={`Additional details${form.issue_type === "OTHER" ? "" : " (optional)"}`} required={form.issue_type === "OTHER"}>
                    <textarea data-testid="lead-desc" value={form.issue_description} onChange={(e) => set("issue_description", e.target.value)} rows={3}
                      placeholder={form.issue_type === "OTHER" ? "Describe your concern..." : "Anything else we should know?"}
                      className="w-full rounded-xl border border-ink-200 px-4 py-3 focus-ring focus:border-brand-400 resize-none" />
                  </Field>
                </div>
              ) : (
                <div className="space-y-4">
                  <Field label="Which city are you in?" required>
                    <select data-testid="lead-city" value={form.city} onChange={(e) => set("city", e.target.value)}
                      className="w-full rounded-xl border border-ink-200 px-4 py-3 focus-ring focus:border-brand-400 bg-white">
                      <option value="">Select your city</option>
                      {cityOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </Field>
                  <div className="rounded-xl bg-brand-50 border border-brand-100 p-4 flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-brand-600 grid place-items-center text-white shrink-0"><Check className="h-4 w-4" /></div>
                    <div className="text-sm text-ink-700">
                      <p className="font-semibold text-ink-900">Almost done, {form.name || "there"}!</p>
                      <p className="mt-1 text-ink-500">We&rsquo;ll match you with the best specialists in {form.city || "your area"} and call on +91 {form.phone}.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer actions */}
            {!done ? (
              <div className="px-6 py-4 border-t border-ink-100 flex items-center gap-2 bg-white shrink-0">
                {step > 1 && (
                  <button type="button" onClick={() => setStep(step - 1)} data-testid="lead-back"
                    className="inline-flex items-center gap-1 px-4 py-2.5 rounded-full text-sm font-semibold text-ink-600 hover:bg-ink-50">
                    <ChevronLeft className="h-4 w-4" /> Back
                  </button>
                )}
                <div className="ml-auto">
                  {step < totalSteps ? (
                    <Button disabled={step === 1 ? !step1Valid : !step2Valid} onClick={() => setStep(step + 1)} data-testid="lead-next">
                      Continue <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button disabled={!step3Valid || submitting} onClick={onFinalSubmit} data-testid="lead-submit">
                      {submitting ? "Submitting..." : "Book Free Consultation"}
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="px-6 py-4 border-t border-ink-100 bg-white shrink-0">
                <Button className="w-full" onClick={() => { setOpen(false); setTimeout(reset, 300); }}>Done</Button>
              </div>
            )}
          </div>

          {/* Cancel-with-partial-capture confirmation */}
          {confirmCancel && (
            <div className="absolute inset-0 z-10 bg-ink-900/70 backdrop-blur grid place-items-center p-6">
              <div className="bg-white rounded-2xl p-6 max-w-sm w-full animate-fade-up">
                <h4 className="font-display text-lg font-bold text-ink-900">Leave without finishing?</h4>
                <p className="mt-2 text-sm text-ink-500">We&rsquo;ll still save your basic info and our team may reach out to help &mdash; or you can come back any time.</p>
                <div className="mt-5 flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => setConfirmCancel(false)} data-testid="lead-cancel-stay">Keep going</Button>
                  <Button variant="secondary" className="flex-1" onClick={closeWithCapture} data-testid="lead-cancel-leave">Leave</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

function Field({ label, required, help, children }: { label: string; required?: boolean; help?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-ink-800 mb-1.5">{label}{required && <span className="text-accent-rose"> *</span>}</span>
      {children}
      {help && <span className="block mt-1 text-xs text-ink-400">{help}</span>}
    </label>
  );
}
