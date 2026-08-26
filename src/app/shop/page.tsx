import { PageHeader } from "@/components/layout/page-header";
import { ProductCatalogSection } from "@/components/product/product-catalog-section";
import { generateMetadata as genMeta } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = genMeta({
  title: "Shop All",
  description:
    "Browse 1000+ premium menswear pieces with filters and pagination — no backend required.",
  path: "/shop",
});

export default function ShopPage() {
  return (
    <>
      <PageHeader
        title="Shop All"
        description="Filter by collection, occasion, size, and price. Only the current page renders — fast even at 1000+ pieces."
      />
      <div className="px-6 pb-20 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <ProductCatalogSection />
      </div>
    </>
  );
}
