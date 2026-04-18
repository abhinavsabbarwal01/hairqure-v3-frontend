// Server-side only API helpers (run on Next.js server, no browser, no CF)
import "server-only";

const UPSTREAM = process.env.BACKEND_URL || "http://65.0.107.90:8080";

let serverToken: { token: string; ts: number } | null = null;
const TTL = 23 * 60 * 60 * 1000;

export interface City { cityId: string | number; cityName: string }
export interface Clinic {
  clinicId?: string | number; id?: string | number; name: string;
  cityName?: string; city?: string; address?: string; areaName?: string;
  rating?: number; averageRating?: number; totalExperience?: number;
  services?: string[]; treatments?: string[];
  imageUrl?: string; image?: string; thumbnailUrls?: string[];
}

async function token(): Promise<string> {
  if (serverToken && Date.now() - serverToken.ts < TTL) return serverToken.token;
  const r = await fetch(`${UPSTREAM}/api/v1/internal/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneNumber: "8650801405", role: "PATIENT" }),
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`token ${r.status}`);
  const d = await r.json();
  const t = d?.data?.token ?? "";
  serverToken = { token: t, ts: Date.now() };
  return t;
}

export async function sGetCities(): Promise<City[]> {
  try {
    const t = await token();
    const r = await fetch(`${UPSTREAM}/api/v1/locations/cities`, {
      headers: { Authorization: `Bearer ${t}` },
      next: { revalidate: 3600 },
    });
    if (!r.ok) return [];
    const d = await r.json();
    return d?.data ?? [];
  } catch { return []; }
}

export async function sDiscoverClinics(cityId: string | number = 1): Promise<Clinic[]> {
  try {
    const t = await token();
    const r = await fetch(`${UPSTREAM}/api/v1/clinics/discover/all`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${t}` },
      body: JSON.stringify({ cityId: Number(cityId) || 1 }),
      next: { revalidate: 300 },
    });
    if (!r.ok) return [];
    const d = await r.json();
    return (d?.data ?? []) as Clinic[];
  } catch { return []; }
}

export async function sGetClinicDetails(id: string | number) {
  try {
    const t = await token();
    const r = await fetch(`${UPSTREAM}/api/v1/clinic/${id}`, {
      headers: { Authorization: `Bearer ${t}` },
      next: { revalidate: 300 },
    });
    if (!r.ok) return null;
    const d = await r.json();
    return d?.data ?? null;
  } catch { return null; }
}

export async function sGetDoctorsByClinic(id: string | number) {
  try {
    const t = await token();
    const r = await fetch(`${UPSTREAM}/api/v1/doctors/clinic/${id}`, {
      headers: { Authorization: `Bearer ${t}` },
      next: { revalidate: 300 },
    });
    if (!r.ok) return [];
    const d = await r.json();
    return d?.data ?? [];
  } catch { return []; }
}
