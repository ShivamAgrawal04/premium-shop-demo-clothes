import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { products } from "@/data/products";
import { getCatalogProductBySlug } from "@/data/catalog";
import { ProductView } from "@/components/product/product-view";
import { enrichProduct } from "@/lib/product-media";
import {
  generateMetadata as genMeta,
  generateProductJsonLd,
  generateBreadcrumbJsonLd,
} from "@/lib/seo";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getCatalogProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return genMeta({
    title: product.name,
    description: product.description,
    path: `/products/${product.slug}`,
  });
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const raw = getCatalogProductBySlug(slug);

  if (!raw) {
    notFound();
  }

  const product = enrichProduct(raw);

  const breadcrumbLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
    { name: product.name, url: `/products/${product.slug}` },
  ]);

  const productLd = generateProductJsonLd({
    name: product.name,
    description: product.description,
    price: product.price,
    currency: product.currency,
    slug: product.slug,
    images: product.images,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />

      <div className="pb-16 pt-8 lg:pt-10">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <nav className="mb-6">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-base text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Shop
            </Link>
          </nav>

          <ProductView product={product} />
        </div>
      </div>
    </>
  );
}
