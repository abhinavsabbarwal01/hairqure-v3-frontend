import * as React from "react";
import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function Section({ className, children, id }: { className?: string; children: React.ReactNode; id?: string }) {
  return <section id={id} className={cn("py-20 lg:py-28", className)}>{children}</section>;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-semibold tracking-widest text-brand-700 uppercase shadow-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-600 animate-pulse" />
      {children}
    </span>
  );
}
