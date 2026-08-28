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
import { useMobileLite } from "@/lib/use-reduced-effects";
import { cn } from "@/lib/utils";

const slides = [
  {
    src: "/images/editorial/hero.jpg",
    label: "Formal",
    objectClass: "object-[42%_35%] sm:object-[45%_22%]",
  },
  {
    src: "/images/editorial/wedding-hero.jpg",
    label: "Wedding",
    objectClass: "object-[58%_40%] sm:object-[55%_30%]",
  },
  {
    src: "/images/collections/party-hero.jpg",
    label: "Celebration",
    objectClass: "object-[50%_45%] sm:object-[50%_38%]",
  },
] as const;

function HeroSlideImage({
  src,
  objectClass,
}: {
  src: string;
  objectClass: string;
}) {
  return (
    <Image
      src={src}
      alt=""
      fill
      priority
      sizes="100vw"
      className={cn("h-full w-full max-w-none object-cover", objectClass)}
    />
  );
}

export function InteractiveHero() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const [active, setActive] = React.useState(0);
  const reduceMotion = useReducedMotion();
  const mobileLite = useMobileLite();
  const parallaxEnabled = !reduceMotion && !mobileLite;

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 70, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 70, damping: 22 });

  const layerTransform = useMotionTemplate`translate3d(calc((${springX} - 0.5) * -20px), calc((${springY} - 0.5) * -14px), 0)`;
  const glowBackground = useMotionTemplate`radial-gradient(480px circle at calc(${springX} * 100%) calc(${springY} * 100%), rgba(184,149,108,0.18), transparent 55%)`;

  React.useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const onMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!parallaxEnabled || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width);
    mouseY.set((event.clientY - rect.top) / rect.height);
  };

  const currentSlide = slides[active];

  return (
    <section
      ref={sectionRef}
      onMouseMove={parallaxEnabled ? onMove : undefined}
      onMouseLeave={
        parallaxEnabled
          ? () => {
              mouseX.set(0.5);
              mouseY.set(0.5);
            }
          : undefined
      }
      className="relative isolate flex w-full max-w-full min-h-[88svh] items-end overflow-hidden bg-[#1a2230] sm:min-h-svh"
    >
      <div className="absolute inset-0 overflow-hidden">
        {reduceMotion ? (
          <div className="absolute inset-0 overflow-hidden bg-[#1a2230]">
            <HeroSlideImage
              src={slides[0].src}
              objectClass={slides[0].objectClass}
            />
          </div>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentSlide.src}
              className="absolute inset-0 overflow-hidden bg-[#1a2230]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              {parallaxEnabled ? (
                <motion.div
                  className="absolute inset-0 sm:-inset-[5%]"
                  style={{ transform: layerTransform }}
                >
                  <HeroSlideImage
                    src={currentSlide.src}
                    objectClass={currentSlide.objectClass}
                  />
                </motion.div>
              ) : (
                <div className="absolute inset-0">
                  <HeroSlideImage
                    src={currentSlide.src}
                    objectClass={currentSlide.objectClass}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {parallaxEnabled && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: glowBackground }}
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/5 sm:from-black/65 sm:via-black/30 sm:to-black/10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[78%] bg-gradient-to-t from-[#070b12]/95 via-[#070b12]/60 to-transparent sm:h-[62%] sm:from-[#070b12]/88 sm:via-[#070b12]/45" />

      <div className="relative z-10 w-full max-w-full px-5 pb-12 pt-24 sm:px-10 sm:pb-20 sm:pt-28 lg:px-16 lg:pb-24 xl:px-24 2xl:px-32">
        <div className="relative max-w-3xl">
          <HeroEntrance>
            <p className="mb-4 font-display text-2xl tracking-[0.12em] text-[#D4B56A] drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] sm:text-3xl lg:text-4xl">
              {siteConfig.name}
            </p>
            <h1 className="font-display max-w-4xl text-[2.35rem] leading-[0.98] tracking-wide text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.9)] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              THE ART OF
              <br />
              DRESSING WELL
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] sm:text-lg">
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
                className="border border-white/70 bg-black/30 text-white shadow-[0_4px_20px_rgba(0,0,0,0.35)] backdrop-blur-sm hover:bg-white hover:text-[#0B1220] sm:bg-transparent sm:shadow-none sm:backdrop-blur-none"
              >
                <Link href="/book-appointment">Book a Visit</Link>
              </Button>
            </div>
          </HeroEntrance>
        </div>

        {!reduceMotion && (
          <div className="mt-10 flex items-center gap-3 sm:mt-12">
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
            <span className="ml-2 text-[10px] uppercase tracking-[0.28em] text-white/80 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
              {currentSlide.label}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
