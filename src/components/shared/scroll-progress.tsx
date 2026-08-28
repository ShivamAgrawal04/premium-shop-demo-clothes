"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useMobileLite } from "@/lib/use-reduced-effects";

/** Thin scroll progress — disabled on mobile for smoother scrolling */
export function ScrollProgress() {
  const mobileLite = useMobileLite();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  if (mobileLite) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-brand"
      style={{ scaleX }}
    />
  );
}
