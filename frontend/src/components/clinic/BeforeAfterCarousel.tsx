"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BA { id: number; beforeImageUrl: string; afterImageUrl: string; description?: string }

export default function BeforeAfterCarousel({ images, onImageClick }: { images: BA[]; onImageClick?: (src: string, caption?: string) => void }) {
  const [i, setI] = useState(0);
  const n = images.length;

  useEffect(() => {
    if (n < 2) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 4500);
    return () => clearInterval(t);
  }, [n]);

  if (n === 0) return null;
  const img = images[i];

  return (
    <div className="relative group">
      <div className="grid grid-cols-2 rounded-2xl overflow-hidden bg-ink-100">
        <button type="button" onClick={() => onImageClick?.(img.beforeImageUrl, "Before")} className="relative aspect-square cursor-zoom-in">
          <Image src={img.beforeImageUrl} alt="Before" fill unoptimized className="object-cover" sizes="(max-width:640px) 50vw, 30vw" />
          <span className="absolute top-2 left-2 text-[10px] font-bold tracking-widest uppercase text-white bg-ink-900/85 rounded-full px-2 py-0.5">Before</span>
        </button>
        <button type="button" onClick={() => onImageClick?.(img.afterImageUrl, "After")} className="relative aspect-square cursor-zoom-in">
          <Image src={img.afterImageUrl} alt="After" fill unoptimized className="object-cover" sizes="(max-width:640px) 50vw, 30vw" />
          <span className="absolute top-2 left-2 text-[10px] font-bold tracking-widest uppercase text-white bg-accent-mint/90 rounded-full px-2 py-0.5">After</span>
        </button>
      </div>

      {n > 1 && (
        <>
          <button type="button" onClick={() => setI((x) => (x - 1 + n) % n)} aria-label="Previous"
            className="absolute top-1/2 left-2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 hover:bg-white backdrop-blur shadow grid place-items-center opacity-0 group-hover:opacity-100 transition">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => setI((x) => (x + 1) % n)} aria-label="Next"
            className="absolute top-1/2 right-2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 hover:bg-white backdrop-blur shadow grid place-items-center opacity-0 group-hover:opacity-100 transition">
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, k) => (
              <button key={k} type="button" onClick={() => setI(k)} aria-label={`Slide ${k + 1}`}
                className={`h-1.5 rounded-full transition-all ${k === i ? "w-5 bg-white" : "w-1.5 bg-white/50"}`} />
            ))}
          </div>
        </>
      )}
      {img.description && <p className="mt-2 text-xs text-ink-500 text-center">{img.description} · {i + 1}/{n}</p>}
    </div>
  );
}
