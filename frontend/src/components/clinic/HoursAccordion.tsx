"use client";
import { useState } from "react";
import { Clock, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const ALL_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

function fmt(t?: string) {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hr = h % 12 || 12;
  return `${hr}:${String(m).padStart(2, "0")} ${ampm}`;
}

export default function HoursAccordion({ open, close, daysCsv }: { open?: string; close?: string; daysCsv?: string }) {
  const [expanded, setExpanded] = useState(false);
  const openDays = new Set((daysCsv ?? "").split(",").map((s) => s.trim()).filter(Boolean));

  const now = new Date();
  const todayName = now.toLocaleString("en-US", { weekday: "long" });
  const isOpenToday = openDays.has(todayName);
  const openH = open ? Number(open.split(":")[0]) * 60 + Number(open.split(":")[1]) : 0;
  const closeH = close ? Number(close.split(":")[0]) * 60 + Number(close.split(":")[1]) : 0;
  const nowM = now.getHours() * 60 + now.getMinutes();
  const isOpenNow = isOpenToday && nowM >= openH && nowM <= closeH;

  const statusText = isOpenNow
    ? `Open now · Closes ${fmt(close)}`
    : isOpenToday && nowM < openH
      ? `Closed · Opens ${fmt(open)}`
      : "Closed today";

  return (
    <div className="rounded-2xl border border-ink-100 overflow-hidden bg-white">
      <button type="button" onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-ink-50 transition" data-testid="hours-toggle" aria-expanded={expanded}>
        <Clock className="h-5 w-5 text-brand-600 shrink-0" />
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2">
            <span className={cn("h-2 w-2 rounded-full", isOpenNow ? "bg-accent-mint" : "bg-accent-rose")} />
            <span className="font-semibold text-ink-900 text-sm">{isOpenNow ? "Open now" : "Closed"}</span>
            <span className="text-ink-400 text-sm">· {statusText.replace(/^(Open now|Closed) · /, "")}</span>
          </div>
          <p className="mt-0.5 text-[11px] text-ink-400">{expanded ? "Hide weekly hours" : "See weekly hours"}</p>
        </div>
        <ChevronDown className={cn("h-4 w-4 text-ink-400 transition-transform", expanded && "rotate-180")} />
      </button>
      {expanded && (
        <div className="border-t border-ink-100 divide-y divide-ink-100" data-testid="hours-list">
          {ALL_DAYS.map((d) => {
            const isOpen = openDays.has(d);
            const isToday = d === todayName;
            return (
              <div key={d} className={cn("px-5 py-3 flex items-center justify-between text-sm", isToday && "bg-brand-50/60")}>
                <span className={cn("text-ink-700", isToday && "font-bold text-ink-900")}>{d}</span>
                <span className={cn(isOpen ? "text-ink-800 font-medium" : "text-ink-400", isToday && isOpen && "text-brand-700 font-bold")}>
                  {isOpen ? `${fmt(open)} – ${fmt(close)}` : "Closed"}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
