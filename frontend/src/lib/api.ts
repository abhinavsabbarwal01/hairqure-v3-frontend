import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.hairqure.com";
const TOKEN_TTL = 23 * 60 * 60 * 1000;

const api = axios.create({
  baseURL: BASE,
  timeout: 12000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

let memToken: { token: string; ts: number } | null = null;
let inflight: Promise<string | null> | null = null;

const safeLS = {
  get(k: string) { try { return typeof window !== "undefined" ? localStorage.getItem(k) : null; } catch { return null; } },
  set(k: string, v: string) { try { if (typeof window !== "undefined") localStorage.setItem(k, v); } catch {} },
  del(k: string) { try { if (typeof window !== "undefined") localStorage.removeItem(k); } catch {} },
};

async function generateToken(): Promise<string | null> {
  try {
    const r = await axios.post(`${BASE}/api/v1/internal/auth/token`, {
      phoneNumber: "8650801405", role: "PATIENT",
    });
    const token = (r.data as { data?: { token?: string } })?.data?.token ?? null;
    if (token) {
      memToken = { token, ts: Date.now() };
      safeLS.set("hq_token", token);
      safeLS.set("hq_token_ts", String(Date.now()));
    }
    return token;
  } catch (e) {
    console.error("token error", e);
    return null;
  } finally {
    inflight = null;
  }
}

async function getToken(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  if (memToken && Date.now() - memToken.ts < TOKEN_TTL) return memToken.token;
  const t = safeLS.get("hq_token"), ts = safeLS.get("hq_token_ts");
  if (t && ts && Date.now() - parseInt(ts) < TOKEN_TTL) {
    memToken = { token: t, ts: parseInt(ts) };
    return t;
  }
  if (!inflight) inflight = generateToken();
  return inflight;
}

async function authed<T>(fn: (t: string) => Promise<T>): Promise<T> {
  const t = await getToken();
  if (!t) throw new Error("Auth unavailable");
  try { return await fn(t); }
  catch (e: unknown) {
    const err = e as { response?: { status?: number } };
    if (err?.response?.status === 401) {
      safeLS.del("hq_token"); safeLS.del("hq_token_ts"); memToken = null;
      const nt = await generateToken();
      if (nt) return fn(nt);
    }
    throw e;
  }
}

export interface City { cityId: string | number; cityName: string }
export interface Clinic {
  id?: string | number; clinicId?: string | number; name: string;
  cityName?: string; city?: string; address?: string;
  rating?: number; averageRating?: number;
  services?: string[]; treatments?: string[];
  imageUrl?: string; image?: string; thumbnailUrls?: string[];
}

export const getCities = () => authed(async (t) => {
  const r = await api.get("/api/v1/locations/cities", { headers: { Authorization: `Bearer ${t}` } });
  return r.data as { data: City[] };
});

export const discoverClinics = (cityId: string | number = 1) => authed(async (t) => {
  const r = await api.post("/api/v1/clinics/discover/all", { cityId }, { headers: { Authorization: `Bearer ${t}` } });
  return (r.data as { data: Clinic[] }).data;
});

export const getClinicDetails = (clinicId: string | number) => authed(async (t) => {
  const r = await api.get(`/api/v1/clinic/${clinicId}`, { headers: { Authorization: `Bearer ${t}` } });
  return (r.data as { data: unknown }).data;
});

export const getDoctorsByClinicId = (clinicId: string | number) => authed(async (t) => {
  const r = await api.get(`/api/v1/doctors/clinic/${clinicId}`, { headers: { Authorization: `Bearer ${t}` } });
  return (r.data as { data: unknown }).data;
});

export const submitHairIssueForm = (payload: Record<string, unknown>) => authed(async (t) => {
  const r = await api.post("/api/v1/hair-issue-form/submit", payload, { headers: { Authorization: `Bearer ${t}` } });
  return r.data;
});
