import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Linkedin, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-ink-200 mt-20" data-testid="site-footer">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Image src="/logo.png" alt="HairQure" width={140} height={36} className="h-8 w-auto brightness-0 invert opacity-90" />
            <p className="mt-4 text-sm text-ink-300 max-w-xs">India&rsquo;s trusted marketplace for verified hair clinics &mdash; transparent pricing, real results, expert specialists.</p>
            <div className="mt-5 flex gap-3">
              <a aria-label="Instagram" href="#" className="p-2 rounded-full bg-white/5 hover:bg-brand-600 transition"><Instagram className="h-4 w-4" /></a>
              <a aria-label="Facebook" href="#" className="p-2 rounded-full bg-white/5 hover:bg-brand-600 transition"><Facebook className="h-4 w-4" /></a>
              <a aria-label="LinkedIn" href="#" className="p-2 rounded-full bg-white/5 hover:bg-brand-600 transition"><Linkedin className="h-4 w-4" /></a>
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/clinics" className="hover:text-white">Find Clinics</Link></li>
              <li><Link href="/treatments" className="hover:text-white">Treatments</Link></li>
              <li><Link href="/why-hairqure" className="hover:text-white">Why HairQure</Link></li>
              <li><Link href="/about" className="hover:text-white">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-4">Treatments</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/clinics" className="hover:text-white">Hair Transplant</Link></li>
              <li><Link href="/clinics" className="hover:text-white">PRP Therapy</Link></li>
              <li><Link href="/clinics" className="hover:text-white">GFC Treatment</Link></li>
              <li><Link href="/clinics" className="hover:text-white">Scalp Care</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-4">Get in touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-brand-300" /> hello@hairqure.com</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-300" /> Delhi NCR, India</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-ink-400">
          <p>&copy; {new Date().getFullYear()} HairQure. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
