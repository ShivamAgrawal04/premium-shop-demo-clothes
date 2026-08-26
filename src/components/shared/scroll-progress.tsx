"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin scroll progress — transform only, cheap on main thread */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-brand"
      style={{ scaleX }}
    />
  );
}
