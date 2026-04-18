import { notFound } from "next/navigation";
import { sGetClinicDetails, sGetDoctorsByClinic, sDiscoverClinics } from "@/lib/api.server";
import type { ClinicDetails, Doctor } from "@/lib/api.server";
import ClinicPageClient from "@/components/clinic/ClinicPageClient";

interface Props { params: Promise<{ city: string; slug: string }> }

function extractId(slug: string): string {
  const parts = slug.split("-");
  return parts[parts.length - 1] || "";
}

export async function generateMetadata({ params }: Props) {
  const { slug, city } = await params;
  const id = extractId(slug);
  const clinic = (await sGetClinicDetails(id)) as ClinicDetails | null;
  if (!clinic) return { title: "Clinic" };
  return {
    title: `${clinic.name} in ${clinic.city ?? city} — Reviews, Doctors, Services`,
    description: clinic.description ?? `${clinic.name} — verified hair clinic in ${clinic.city}. Book a free consultation.`,
    alternates: { canonical: `/clinic/${city}/${slug}` },
    openGraph: {
      title: clinic.name,
      description: clinic.description ?? "",
      images: clinic.thumbnailUrls?.[0] ? [{ url: clinic.thumbnailUrls[0] }] : [],
    },
  };
}

export const dynamic = "force-dynamic";

export default async function Page({ params }: Props) {
  const { slug, city } = await params;
  const id = extractId(slug);
  if (!id) notFound();
  const [clinic, doctors, peers] = await Promise.all([
    sGetClinicDetails(id) as Promise<ClinicDetails | null>,
    sGetDoctorsByClinic(id) as Promise<Doctor[]>,
    sDiscoverClinics(1),
  ]);
  if (!clinic) notFound();
  const related = peers.filter((c) => String(c.clinicId ?? c.id) !== String(id)).slice(0, 3);
  return <ClinicPageClient clinic={clinic} doctors={doctors} related={related} citySlug={city} />;
}
