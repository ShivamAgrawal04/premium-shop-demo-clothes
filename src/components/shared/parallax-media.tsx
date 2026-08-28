"use client";

import * as React from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";
import { useMobileLite } from "@/lib/use-reduced-effects";

interface ParallaxMediaProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/** Subtle scroll parallax on desktop — static image on mobile */
export function ParallaxMedia({
  src,
  alt,
  className,
  sizes,
  priority,
}: ParallaxMediaProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const mobileLite = useMobileLite();
  const lite = reduceMotion || mobileLite;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  if (lite) {
    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden bg-secondary", className)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-secondary", className)}>
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
