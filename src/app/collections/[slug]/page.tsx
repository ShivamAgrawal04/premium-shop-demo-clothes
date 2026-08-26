import { notFound } from "next/navigation";
import { collections, getCollectionBySlug } from "@/data/collections";
import { getProductsByCollection } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import type { Metadata } from "next";
import { generateMetadata as genMeta, generateBreadcrumbJsonLd } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return { title: "Collection Not Found" };
  return genMeta({
    title: `${collection.name} Collection`,
    description: collection.description,
    path: `/collections/${collection.slug}`,
  });
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const products = getProductsByCollection(slug);
  const breadcrumbLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Collections", url: "/collections" },
    { name: collection.name, url: `/collections/${collection.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Collection Hero */}
      <section className="relative pt-24 pb-16 lg:pt-28 overflow-hidden bg-foreground text-background">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `linear-gradient(135deg, hsl(36, 53%, 45%, 0.3) 0%, transparent 50%)`,
          }}
        />
        <div className="relative z-10 px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 text-center py-12 sm:py-16">
          <p className="text-xs uppercase tracking-[0.3em] text-brand mb-4">
            Collection
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-wide">
            {collection.name}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-background/60 text-base sm:text-lg">
            {collection.description}
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-24 sm:py-32">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">
                Products coming soon. Check back for updates.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
