import { ProductCatalogSection } from "@/components/product/product-catalog-section";
import { PageHeader } from "@/components/layout/page-header";
import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "New Arrivals",
  description: "Discover our latest arrivals in premium menswear.",
  path: "/new-arrivals",
});

export default function NewArrivalsPage() {
  return (
    <>
      <PageHeader
        title="New Arrivals"
        description="Fresh pieces, just arrived. Be the first to wear them."
      />
      <div className="px-6 pb-20 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <ProductCatalogSection
          newArrivalsOnly
          emptyLabel="No new arrivals match these filters."
        />
      </div>
    </>
  );
}
