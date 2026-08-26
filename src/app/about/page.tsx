import Link from "next/link";
import { MapPin, Clock, Phone, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { FadeIn } from "@/components/shared/fade-in";
import { ParallaxMedia } from "@/components/shared/parallax-media";
import { StoreMap } from "@/components/shared/store-map";
import { siteConfig } from "@/config/site";
import { whatsappGeneralInquiry } from "@/lib/whatsapp";
import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "About Us",
  description: `Learn about ${siteConfig.name}, premium menswear in ${siteConfig.location.city}.`,
  path: "/about",
});

const values = [
  {
    title: "Quality First",
    description:
      "Premium fabrics and careful finishing — pieces made to last beyond a season.",
  },
  {
    title: "Personal Service",
    description:
      "One-on-one styling so every gentleman leaves with the right fit and look.",
  },
  {
    title: "Timeless Style",
    description:
      "Collections that balance tradition and modern tailoring — never trend-chasing.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-secondary pt-24 lg:pt-28">
        <div className="relative z-10 px-6 py-14 sm:px-10 sm:py-16 lg:px-16 xl:px-24 2xl:px-32">
          <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-brand">
            About
          </p>
          <h1 className="font-display max-w-3xl text-4xl tracking-wide text-foreground sm:text-5xl lg:text-6xl">
            The story behind
            <br />
            The Gentleman Store
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Premium menswear from Bhind — tailored taste, honest craft, and
            service that feels personal.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <FadeIn className="lg:col-span-6">
              <ParallaxMedia
                src="/images/editorial/tailor.jpg"
                alt="Craftsmanship at The Gentleman Store"
                className="aspect-[5/4] shadow-[var(--shadow-medium)]"
                sizes="(min-width: 1024px) 48vw, 100vw"
                priority
              />
            </FadeIn>
            <FadeIn delay={0.08} className="lg:col-span-6">
              <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-brand">
                Our Story
              </p>
              <h2 className="font-display text-3xl tracking-wide sm:text-4xl">
                A commitment to dressing well
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                <p>
                  The Gentleman Store was born from a simple belief: every man
                  deserves well-crafted clothing that reflects his taste and
                  ambition.
                </p>
                <p>
                  Based in {siteConfig.location.city}, we curate traditional
                  Indian wear and contemporary Western formalwear — selected for
                  quality, fit, and lasting style.
                </p>
                <p>
                  Our stylists understand that dressing well is personal. We
                  help you find pieces that feel authentically you.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/60 py-14 sm:py-16">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
            {values.map((value, i) => (
              <FadeIn key={value.title} delay={i * 0.05}>
                <h3 className="font-display text-xl tracking-wide">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="font-display text-3xl tracking-wide">
                Visit our store
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Find us at Katra Mohalla, Hanuman Bazariya, Bhind. Book a visit or message us
                on WhatsApp — we respond quickly.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      {siteConfig.location.address}
                    </p>
                    <a
                      href={siteConfig.location.mapsOpenUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-xs text-brand hover:underline"
                    >
                      Open in Google Maps
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <div>
                    <p className="text-sm font-medium">Phone & WhatsApp</p>
                    <a
                      href={siteConfig.location.phoneHref}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {siteConfig.location.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <div>
                    <p className="text-sm font-medium">Hours</p>
                    <p className="text-sm text-muted-foreground">
                      Mon–Fri: {siteConfig.hours.weekdays}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Sat–Sun: {siteConfig.hours.weekends}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="brand">
                  <Link href="/book-appointment">
                    Book an Appointment
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <a
                    href={whatsappGeneralInquiry()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <StoreMap className="min-h-[360px] border border-border shadow-[var(--shadow-soft)]" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
