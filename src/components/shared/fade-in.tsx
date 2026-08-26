"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  viewport?: boolean;
}

export function FadeIn({
  children,
  delay = 0,
  className,
  direction = "up",
  viewport = true,
}: FadeInProps) {
  const directionMap = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionMap[direction] }}
      whileInView={viewport ? { opacity: 1, x: 0, y: 0 } : undefined}
      animate={!viewport ? { opacity: 1, x: 0, y: 0 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
