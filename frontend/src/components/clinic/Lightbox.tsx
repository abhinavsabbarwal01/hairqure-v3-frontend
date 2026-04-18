"use client";
import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export interface LightboxImage { src: string; alt?: string; caption?: string }

export default function Lightbox({ image, onClose }: { image: LightboxImage | null; onClose: () => void }) {
  useEffect(() => {
    if (!image) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [image, onClose]);

  if (!image) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8" data-testid="lightbox" onClick={onClose}>
      <div className="absolute inset-0 bg-ink-900/85 backdrop-blur-xl" />
      <button onClick={onClose} aria-label="Close image"
        className="absolute top-5 right-5 z-10 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white grid place-items-center border border-white/20">
        <X className="h-5 w-5" />
      </button>
      <div className="relative max-w-5xl w-full max-h-[85vh] animate-fade-up" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full h-[75vh]">
          <Image src={image.src} alt={image.alt ?? ""} fill unoptimized className="object-contain" sizes="90vw" priority />
        </div>
        {image.caption && <p className="mt-3 text-center text-white/80 text-sm">{image.caption}</p>}
      </div>
    </div>
  );
}
