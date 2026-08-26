"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  AnimatePresence,
  useReducedMotion,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroEntrance } from "@/components/shared/hero-entrance";
import { siteConfig } from "@/config/site";

const slides = [
  { src: "/images/editorial/hero.jpg", label: "Formal" },
  { src: "/images/editorial/wedding-hero.jpg", label: "Wedding" },
  { src: "/images/collections/party-hero.jpg", label: "Celebration" },
];

export function InteractiveHero() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const [active, setActive] = React.useState(0);
  const reduce = useReducedMotion();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 70, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 70, damping: 22 });

  const layerTransform = useMotionTemplate`translate3d(calc((${springX} - 0.5) * -28px), calc((${springY} - 0.5) * -18px), 0) scale(1.08)`;
  const glowBackground = useMotionTemplate`radial-gradient(480px circle at calc(${springX} * 100%) calc(${springY} * 100%), rgba(184,149,108,0.22), transparent 55%)`;

  React.useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [reduce]);

  const onMove = (event: React.MouseEvent<HTMLElement>) => {
    if (reduce || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width);
    mouseY.set((event.clientY - rect.top) / rect.height);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mouseX.set(0.5);
        mouseY.set(0.5);
      }}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#070B12]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slides[active].src}
            className="absolute inset-0"
            style={reduce ? undefined : { transform: layerTransform }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={slides[active].src}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_18%]"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: glowBackground }}
        />
      )}

      {/* Always cinematic — works in light + dark, photos stay rich, text stays white */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />

      <div className="relative z-10 w-full px-6 pb-16 pt-28 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24 xl:px-24 2xl:px-32">
        <div className="max-w-3xl">
          <HeroEntrance>
            <p className="mb-4 font-display text-2xl tracking-[0.12em] text-[#C4A35A] sm:text-3xl lg:text-4xl">
              {siteConfig.name}
            </p>
            <h1 className="font-display max-w-4xl text-4xl leading-[0.95] tracking-wide text-white sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              THE ART OF
              <br />
              DRESSING WELL
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
              Premium menswear for weddings, celebrations and every occasion
              worth dressing for.
            </p>
          </HeroEntrance>

          <HeroEntrance delay={0.3}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="xl"
                className="bg-[#C4A35A] text-[#0B1220] hover:bg-[#B8956C]"
              >
                <Link href="/collections">
                  Explore Collection
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="xl"
                className="border border-white/60 bg-transparent text-white hover:bg-white hover:text-[#0B1220]"
              >
                <Link href="/book-appointment">Book a Visit</Link>
              </Button>
            </div>
          </HeroEntrance>
        </div>

        <div className="mt-12 flex items-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.label}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show ${slide.label} look`}
              className={
                active === index
                  ? "h-1.5 w-10 rounded-full bg-[#C4A35A]"
                  : "h-1.5 w-5 rounded-full bg-white/35 transition-all hover:bg-white/65"
              }
            />
          ))}
          <span className="ml-2 text-[10px] uppercase tracking-[0.28em] text-white/55">
            {slides[active].label}
          </span>
        </div>
      </div>
    </section>
  );
}
