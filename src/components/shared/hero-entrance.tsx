"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface HeroEntranceProps {
  children: ReactNode;
  delay?: number;
}

export function HeroEntrance({ children, delay = 0.2 }: HeroEntranceProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay }}
    >
      {children}
    </motion.div>
  );
}
