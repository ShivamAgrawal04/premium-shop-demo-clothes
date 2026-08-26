"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface HeroEntranceProps {
  children: ReactNode;
  delay?: number;
}

export function HeroEntrance({ children, delay = 0.2 }: HeroEntranceProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay }}
      style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
    >
      {children}
    </motion.div>
  );
}
