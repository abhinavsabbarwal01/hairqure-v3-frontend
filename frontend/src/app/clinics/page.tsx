import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container, Section, Eyebrow } from "@/components/ui/Layout";

export const metadata = { title: "Find Clinics" };

export default function ClinicsPage() {
  return (
    <Section>
      <Container>
        <Eyebrow>Coming in Session B</Eyebrow>
        <h1 className="mt-4 font-display text-4xl font-bold text-ink-900">Clinics Discovery</h1>
        <p className="mt-3 text-ink-500 max-w-xl">This page (filters, search, map, listing) is scheduled for the next session. The foundation + homepage are live.</p>
        <Link href="/" className="mt-6 inline-block"><Button variant="outline">Back to Home</Button></Link>
      </Container>
    </Section>
  );
}
