import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.hairqure.com"),
  title: { default: "HairQure — Find Trusted Hair Clinics & Specialists in Delhi NCR", template: "%s | HairQure" },
  description: "India's curated marketplace for verified hair clinics. Compare transparent pricing, browse real before/after results, and book consultations with expert hair specialists.",
  keywords: ["hair clinic delhi", "hair transplant", "PRP treatment", "GFC treatment", "hair loss", "trichologist delhi"],
  openGraph: {
    type: "website", locale: "en_IN", siteName: "HairQure",
    title: "HairQure — Trusted Hair Clinics Marketplace",
    description: "Compare verified clinics, real results, transparent pricing.",
    url: "https://www.hairqure.com", images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "HairQure", description: "Trusted hair clinics marketplace", images: ["/og-image.jpg"] },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-ink-800 antialiased">
        <Navigation />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
