import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/shared/fade-in";
import { HeroEntrance } from "@/components/shared/hero-entrance";
import {
  getFeaturedProducts,
  getNewArrivals,
  getBestsellers,
} from "@/data/products";
import { whatsappWeddingInquiry } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";

const occasions = [
  {
    title: "Wedding",
    description: "Made for the moments that deserve more.",
    cta: "Explore Wedding Collection",
    href: "/collections/wedding",
    imgSrc: "/images/categories/wedding.jpg",
    imgAlt: "Wedding Collection",
  },
  {
    title: "Formal",
    description: "Dress for the position you want.",
    cta: "Explore Formal Wear",
    href: "/collections/formal",
    imgSrc: "/images/collections/formal.jpg",
    imgAlt: "Formal Collection",
  },
  {
    title: "Party",
    description: "Own the night.",
    cta: "Explore Party Collection",
    href: "/collections/party",
    imgSrc: "/images/categories/party.jpg",
    imgAlt: "Party Collection",
  },
  {
    title: "Casual",
    description: "Style without trying too hard.",
    cta: "Explore Casual Wear",
    href: "/collections/casual",
    imgSrc: "/images/categories/casual.jpg",
    imgAlt: "Casual Collection",
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 4);
  const newArrivals = getNewArrivals().slice(0, 4);
  const bestsellers = getBestsellers().slice(0, 4);

  return (
    <>
      {/* Hero — full bleed */}
      <section className="relative flex min-h-[min(860px,100svh)] items-end overflow-hidden bg-foreground">
        <div className="absolute inset-0 bg-black" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-65"
          style={{ backgroundImage: "url(/images/editorial/hero.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 pb-20 sm:pb-28 lg:pb-32">
          <div className="max-w-3xl">
            <HeroEntrance>
              <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.4em] text-brand">
                {siteConfig.name}
              </p>
              <h1 className="font-display max-w-4xl text-5xl leading-[0.92] tracking-wide text-white sm:text-6xl lg:text-8xl xl:text-[6.5rem]">
                THE ART OF
                <br />
                DRESSING WELL
              </h1>
              <p className="mt-8 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
                Premium menswear for weddings, celebrations and every occasion
                worth dressing for.
              </p>
            </HeroEntrance>

            <HeroEntrance delay={0.6}>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button asChild size="xl" variant="brand">
                  <Link href="/collections">
                    Explore Collection
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="xl"
                  variant="outline"
                  className="border-white/25 text-white hover:bg-white/10"
                >
                  <Link href="/book-appointment">Book a Visit</Link>
                </Button>
              </div>
            </HeroEntrance>
          </div>
        </div>
      </section>

      {/* Editorial — asymmetric split */}
      <section className="py-24 sm:py-32 lg:py-40">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
            <FadeIn direction="left" className="lg:col-span-7">
              <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] bg-secondary overflow-hidden">
                <Image
                  src="/images/editorial/tailor.jpg"
                  alt="The Gentleman Store - premium menswear craftsmanship"
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </FadeIn>

            <FadeIn
              direction="right"
              delay={0.2}
              className="lg:col-span-5 lg:pl-8"
            >
              <p className="text-[11px] uppercase tracking-[0.3em] text-brand mb-5">
                Our Story
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] tracking-wide leading-tight">
                Crafted for the
                <br />
                Modern Gentleman
              </h2>
              <p className="mt-7 text-muted-foreground leading-[1.8] text-[15px]">
                At The Gentleman Store, we believe that dressing well is not
                about following trends. It is about understanding quality,
                appreciating craftsmanship, and wearing clothes that reflect who
                you are.
              </p>
              <p className="mt-4 text-muted-foreground leading-[1.8] text-[15px]">
                From hand-tailored suits to heritage Indian wear, every piece in
                our collection is curated for the man who values substance over
                flash.
              </p>
              <Button asChild variant="outline" className="mt-10">
                <Link href="/about">
                  Read Our Story
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Shop by Occasion — full-bleed grid */}
      <section className="bg-secondary/40 py-24 sm:py-32">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <SectionHeading
            title="Shop by Occasion"
            subtitle="Every moment deserves its own style."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {occasions.map((occasion, index) => (
              <FadeIn key={occasion.title} delay={index * 0.08}>
                <Link
                  href={occasion.href}
                  className="group relative block aspect-[3/4] overflow-hidden"
                >
                  <Image
                    src={occasion.imgSrc}
                    alt={occasion.imgAlt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-7">
                    <h3 className="font-display text-2xl sm:text-[1.65rem] text-background tracking-wide">
                      {occasion.title}
                    </h3>
                    <p className="mt-1 text-sm text-background/60 leading-relaxed">
                      {occasion.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-background/80 group-hover:text-brand transition-colors duration-300">
                      {occasion.cta}
                      <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products — wide grid */}
      <section className="py-24 sm:py-32">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <SectionHeading
            title="Featured Pieces"
            subtitle="Our most coveted designs, chosen by gentlemen who know quality."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12">
            {featured.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
          <div className="mt-14 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/collections">
                View All Collections
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Wedding Editorial — full-bleed dark */}
      <section className="bg-foreground py-24 text-primary-foreground sm:py-32 lg:py-40">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
            <FadeIn
              direction="left"
              className="lg:col-span-5 lg:pr-8 order-2 lg:order-1"
            >
              <p className="text-[11px] uppercase tracking-[0.3em] text-brand mb-5">
                The Wedding Edit
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] tracking-wide leading-tight">
                Your Wedding Look
                <br />
                Deserves More
              </h2>
              <p className="mt-7 text-primary-foreground/65 leading-[1.8] text-[15px]">
                From sherwanis to bandhgalas, from kurtas to wedding accessories
                — discover pieces crafted for the most important celebration of
                your life.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button asChild variant="brand" size="lg">
                  <Link href="/wedding">
                    Explore Wedding Edit
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <a
                    href={whatsappWeddingInquiry()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Wedding Enquiry
                  </a>
                </Button>
              </div>
            </FadeIn>

            <FadeIn
              direction="right"
              delay={0.2}
              className="lg:col-span-7 order-1 lg:order-2"
            >
              <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/3] overflow-hidden bg-background/5">
                <Image
                  src="/images/editorial/wedding-hero.jpg"
                  alt="Wedding Collection"
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24 sm:py-32">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <SectionHeading
            title="New Arrivals"
            subtitle="Fresh pieces, just arrived. Be the first to wear them."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12">
            {newArrivals.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
          <div className="mt-14 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/new-arrivals">
                View All New Arrivals
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="bg-secondary/40 py-24 sm:py-32">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <SectionHeading
            title="Bestsellers"
            subtitle="The pieces our gentlemen keep coming back for."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12">
            {bestsellers.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA — full-width */}
      <section className="py-24 sm:py-32">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <div className="relative overflow-hidden bg-foreground px-8 py-20 text-center text-primary-foreground sm:px-16 sm:py-28 lg:px-24">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 50% 50%, hsl(36 50% 42%) 0%, transparent 60%)",
              }}
            />
            <div className="relative z-10">
              <Sparkles className="h-7 w-7 text-brand mx-auto mb-7" />
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-wide">
                Visit Our Store
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-primary-foreground/65">
                Experience our collection in person. Our stylists will help you
                find the perfect piece for every occasion.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="brand" size="lg">
                  <Link href="/book-appointment">
                    Book an Appointment
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Link href="/contact">Get Directions</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
