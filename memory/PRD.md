# HairQure Frontend V2 — PRD

## Problem
Redesign `hairqure-frontend-v2` (Next.js marketplace for verified hair clinics in Delhi NCR) into a polished, SEO-strong, mobile-first, conversion-focused V2. Backend (Spring Boot @ api.hairqure.com) unchanged. Push final code to `hairqure_frontend` repo via Emergent "Save to GitHub".

## Stack
Next.js 15 (App Router) + TypeScript + Tailwind 3.4 + framer-motion + lucide-react + axios

## Design System (Session A)
- Palette: blue (`brand-*`) + ink neutrals + mint/amber/rose accents
- Fonts: Plus Jakarta Sans (display), Inter (body), Instrument Serif (editorial)
- Components: Button (4 variants, 3 sizes), Container, Section, Eyebrow
- Utilities: `text-gradient`, `skeleton`, `grain`, `focus-ring`, orb blurs, custom animations

## Completed (Session A — Apr 2026)
- Replaced CRA with Next.js 15 App Router scaffold
- Supervisor switched to `next dev`
- `lib/api.ts` ported with auth token (hardcoded phone 8650801405/PATIENT, 23h cache)
- Navigation (sticky, scroll-blur, mobile menu) + Footer
- Home redesign: Hero, Treatments, ClinicsShowcase (live API), WhyUs, CTA band
- `/clinics` placeholder
- SEO metadata in root layout

## P0 Backlog (Session B)
- `/clinics` listing: city filter, search, treatment chips, sort, map toggle, grid + skeletons
- Fix hero framer-motion initial visibility (ensure SSR renders content)

## P1 Backlog
- `/clinic/[city]/[slug]` with sticky booking rail, tabs (About/Doctors/Services/Gallery/Reviews/Hours)
- Multi-step HairIssueForm
- About / Contact / Why-HairQure redesign
- Dark mode toggle
- WhatsApp floating button
- Structured data (LocalBusiness, MedicalClinic)
- sitemap.ts + robots.txt

## P2
- Analytics (Vercel)
- Per-clinic static generation (generateStaticParams)
- Lighthouse 95+ pass

## API Contract (unchanged)
- POST /api/v1/internal/auth/token
- GET /api/v1/locations/cities
- POST /api/v1/clinics/discover/all
- GET /api/v1/clinic/:id
- GET /api/v1/doctors/clinic/:id
- POST /api/v1/hair-issue-form/submit
