"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
}

/** CSS-only infinite marquee — no JS on scroll */
export function Marquee({ items, className }: MarqueeProps) {
  const row = [...items, ...items];

  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-border/70 bg-secondary/60 py-4",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-24" />
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap px-6">
        {row.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="font-display text-2xl tracking-[0.08em] text-foreground/80 sm:text-3xl"
          >
            {item}
            <span className="ml-10 text-brand">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
