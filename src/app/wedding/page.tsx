import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCatalogSection } from "@/components/product/product-catalog-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/shared/fade-in";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { whatsappWeddingInquiry } from "@/lib/whatsapp";
import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "Wedding Collection",
  description:
    "Handcrafted wedding menswear. Sherwanis, bandhgalas, kurtas and accessories for the Indian groom.",
  path: "/wedding",
});

const weddingCategories = [
  {
    name: "Sherwanis",
    description: "Grand ceremonial pieces for the groom",
    image: "/images/categories/sherwanis.jpg",
  },
  {
    name: "Bandhgalas",
    description: "Regal Indian formal wear",
    image: "/images/categories/bandhgala.jpg",
  },
  {
    name: "Kurtas",
    description: "Contemporary wedding kurtas",
    image: "/images/categories/kurtas.jpg",
  },
  {
    name: "Accessories",
    description: "Stoles, cufflinks and more",
    image: "/images/categories/accessories.jpg",
  },
];

export default function WeddingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-secondary pb-16 pt-10 lg:pb-20 lg:pt-12">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url(/images/editorial/wedding-hero.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/55 to-black/70 dark:from-secondary/40 dark:via-secondary/80 dark:to-secondary" />
        <div className="relative z-10 px-6 py-12 text-center sm:px-10 sm:py-20 lg:px-16 xl:px-24 2xl:px-32">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-brand">
            The Wedding Edit
          </p>
          <h1 className="font-display text-4xl tracking-wide text-white dark:text-foreground sm:text-5xl lg:text-6xl">
            Your Wedding Look
            <br />
            Deserves More
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/70 dark:text-muted-foreground sm:text-lg">
            From sherwanis to bandhgalas, from kurtas to wedding accessories —
            discover pieces crafted for the most important celebration of your
            life.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild variant="brand" size="lg">
              <a
                href={whatsappWeddingInquiry()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Wedding Enquiry
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/50 bg-transparent text-white hover:bg-white hover:text-foreground dark:border-foreground/20 dark:text-foreground dark:hover:bg-foreground dark:hover:text-background"
            >
              <Link href="/book-appointment">
                Book Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 sm:py-32">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <SectionHeading
            title="Wedding Categories"
            subtitle="Everything you need for the perfect wedding look."
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {weddingCategories.map((cat, index) => (
              <FadeIn key={cat.name} delay={index * 0.1}>
                <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-secondary mb-4 overflow-hidden rounded">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-display text-lg tracking-wide">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {cat.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-24 sm:py-32 bg-secondary/40">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <SectionHeading
            title="Wedding Collection"
            subtitle="Handpicked pieces for your special day."
          />
          <ProductCatalogSection
            lockedCollection="wedding"
            emptyLabel="No wedding pieces match these filters."
          />
        </div>
      </section>
    </>
  );
}
