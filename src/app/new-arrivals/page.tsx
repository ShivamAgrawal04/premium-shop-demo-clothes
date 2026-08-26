import { getNewArrivals } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import { PageHeader } from "@/components/layout/page-header";
import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "New Arrivals",
  description: "Discover our latest arrivals in premium menswear.",
  path: "/new-arrivals",
});

export default function NewArrivalsPage() {
  const products = getNewArrivals();

  return (
    <>
      <PageHeader
        title="New Arrivals"
        description="Fresh pieces, just arrived. Be the first to wear them."
      />
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}
