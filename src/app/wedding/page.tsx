import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/shared/fade-in";
import { getProductsByCollection } from "@/data/products";
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
  const products = getProductsByCollection("wedding");

  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-16 lg:pt-28 overflow-hidden bg-foreground text-background">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 30%, hsl(36, 53%, 45%, 0.3) 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 text-center py-12 sm:py-20">
          <p className="text-xs uppercase tracking-[0.3em] text-brand mb-4">
            The Wedding Edit
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-wide">
            Your Wedding Look
            <br />
            Deserves More
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-background/60 text-base sm:text-lg">
            From sherwanis to bandhgalas, from kurtas to wedding accessories —
            discover pieces crafted for the most important celebration of your
            life.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="brand" size="lg">
              <a
                href={whatsappWeddingInquiry()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                Wedding Enquiry
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-background/20 text-background hover:bg-background/10"
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
