import { notFound } from "next/navigation";
import { collections, getCollectionBySlug } from "@/data/collections";
import { ProductCatalogSection } from "@/components/product/product-catalog-section";
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

      <section className="relative overflow-hidden border-b border-border bg-secondary pt-8 pb-16 lg:pb-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${collection.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/30 dark:from-secondary dark:via-secondary/80 dark:to-secondary/50" />
        <div className="relative z-10 px-6 py-12 text-center sm:px-10 sm:py-16 lg:px-16 xl:px-24 2xl:px-32">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-brand">
            Collection
          </p>
          <h1 className="font-display text-4xl tracking-wide text-white dark:text-foreground sm:text-5xl lg:text-6xl">
            {collection.name}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70 dark:text-muted-foreground sm:text-lg">
            {collection.description}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <ProductCatalogSection
            lockedCollection={slug}
            emptyLabel="No pieces match these filters in this collection."
          />
        </div>
      </section>
    </>
  );
}
