import { notFound } from "next/navigation";
import { sGetClinicDetails, sGetDoctorsByClinic, sDiscoverClinics, sGetServicePackages } from "@/lib/api.server";
import type { ClinicDetails, Doctor, ServicePackage } from "@/lib/api.server";
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

  // Attach images from discover-list (detail API omits thumbnailUrls)
  const listEntry = peers.find((c) => String(c.clinicId ?? c.id) === String(id));
  clinic.thumbnailUrls = listEntry?.thumbnailUrls ?? [];

  // Fetch packages for services that have them
  const servicesWithPackages = (clinic.services ?? []).filter((s) => (s as unknown as { hasPackages?: boolean }).hasPackages);
  const packageResults = await Promise.all(
    servicesWithPackages.map((s) => sGetServicePackages(s.service?.id ?? s.id).then((pkgs) => [s.id, pkgs] as [number, ServicePackage[]]))
  );
  const packagesByServiceId: Record<number, ServicePackage[]> = Object.fromEntries(packageResults);

  const related = peers.filter((c) => String(c.clinicId ?? c.id) !== String(id)).slice(0, 3);
  return <ClinicPageClient clinic={clinic} doctors={doctors} related={related} citySlug={city} packagesByServiceId={packagesByServiceId} />;
}
