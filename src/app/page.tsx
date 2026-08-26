import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/shared/fade-in";
import { InteractiveHero } from "@/components/shared/interactive-hero";
import { Marquee } from "@/components/shared/marquee";
import { ParallaxMedia } from "@/components/shared/parallax-media";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { getFeaturedProducts, getNewArrivals } from "@/data/products";
import { whatsappWeddingInquiry } from "@/lib/whatsapp";

const occasions = [
  {
    title: "Wedding",
    description: "Made for the moments that deserve more.",
    cta: "Explore Wedding",
    href: "/collections/wedding",
    imgSrc: "/images/categories/wedding.jpg",
    imgAlt: "Wedding Collection",
  },
  {
    title: "Formal",
    description: "Dress for the position you want.",
    cta: "Explore Formal",
    href: "/collections/formal",
    imgSrc: "/images/collections/formal.jpg",
    imgAlt: "Formal Collection",
  },
  {
    title: "Party",
    description: "Own the night.",
    cta: "Explore Party",
    href: "/collections/party",
    imgSrc: "/images/categories/party.jpg",
    imgAlt: "Party Collection",
  },
  {
    title: "Casual",
    description: "Style without trying too hard.",
    cta: "Explore Casual",
    href: "/collections/casual",
    imgSrc: "/images/categories/casual.jpg",
    imgAlt: "Casual Collection",
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 4);
  const newArrivals = getNewArrivals().slice(0, 4);

  return (
    <>
      <ScrollProgress />
      <InteractiveHero />

      <Marquee
        items={[
          "Wedding",
          "Formal",
          "Sherwani",
          "Bandhgala",
          "Suits",
          "Bespoke",
          "Bhind",
        ]}
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <FadeIn direction="left" className="lg:col-span-5">
              <ParallaxMedia
                src="/images/editorial/store.jpg"
                alt="The Gentleman Store boutique interior"
                className="aspect-[4/3] shadow-[var(--shadow-medium)] sm:aspect-[16/11]"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </FadeIn>

            <FadeIn
              direction="right"
              delay={0.08}
              className="lg:col-span-7 lg:pl-2"
            >
              <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-brand">
                Our Story
              </p>
              <h2 className="font-display text-2xl leading-tight tracking-wide sm:text-3xl lg:text-4xl">
                Crafted for the Modern Gentleman
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                Dressing well is not about chasing trends. It is about quality,
                craftsmanship, and clothes that reflect who you are.
              </p>
              <Button asChild variant="outline" className="mt-6">
                <Link href="/about">
                  Read Our Story
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-secondary/70 py-20 sm:py-24">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <SectionHeading
            title="Shop by Occasion"
            subtitle="Every moment deserves its own style."
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {occasions.map((occasion, index) => (
              <FadeIn key={occasion.title} delay={index * 0.06}>
                <Link
                  href={occasion.href}
                  className="group relative block aspect-[3/4] overflow-hidden bg-card shadow-[var(--shadow-soft)] transition-shadow duration-500 hover:shadow-[var(--shadow-medium)]"
                >
                  <Image
                    src={occasion.imgSrc}
                    alt={occasion.imgAlt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-7">
                    <h3 className="font-display text-2xl tracking-wide text-white">
                      {occasion.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/70">
                      {occasion.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/85 transition-colors group-hover:text-brand">
                      {occasion.cta}
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1.5" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <SectionHeading
            title="Featured Pieces"
            subtitle="Chosen for gentlemen who know quality."
          />
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
            {featured.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/collections">
                View All Collections
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-brand-surface py-16 sm:py-20 lg:py-24">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <FadeIn
              direction="left"
              className="order-2 lg:order-1 lg:col-span-5"
            >
              <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-brand">
                The Wedding Edit
              </p>
              <h2 className="font-display text-3xl leading-tight tracking-wide sm:text-4xl lg:text-[2.75rem]">
                Your Wedding Look
                <br />
                Deserves More
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-[1.8] text-muted-foreground">
                Sherwanis, bandhgalas, kurtas and accessories — crafted for the
                most important celebration of your life.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="brand" size="lg">
                  <Link href="/wedding">
                    Explore Wedding Edit
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a
                    href={whatsappWeddingInquiry()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Wedding Enquiry
                  </a>
                </Button>
              </div>
            </FadeIn>

            <FadeIn
              direction="right"
              delay={0.12}
              className="order-1 lg:order-2 lg:col-span-7"
            >
              <ParallaxMedia
                src="/images/editorial/wedding-hero.jpg"
                alt="Wedding Collection"
                className="aspect-[4/3] shadow-[var(--shadow-medium)] lg:aspect-[16/11]"
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <SectionHeading
            title="New Arrivals"
            subtitle="Fresh pieces — be the first to wear them."
          />
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
            {newArrivals.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/new-arrivals">
                View All New Arrivals
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <FadeIn>
            <div className="relative overflow-hidden border border-border bg-card px-8 py-16 text-center shadow-[var(--shadow-medium)] sm:px-16 sm:py-20">
              <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 50% 0%, hsl(var(--brand) / 0.18) 0%, transparent 55%)",
                }}
              />
              <div className="relative z-10">
                <span
                  className="float-soft mx-auto mb-6 inline-flex text-brand"
                  aria-hidden
                >
                  <Sparkles className="h-7 w-7" />
                </span>
                <h2 className="font-display text-3xl tracking-wide sm:text-4xl lg:text-5xl">
                  Visit Our Store
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                  Book a visit or send an enquiry — every lead reaches the shop
                  owner on WhatsApp.
                </p>
                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                  <Button asChild variant="brand" size="lg">
                    <Link href="/book-appointment">
                      Book an Appointment
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/enquiry">Send an Enquiry</Link>
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
