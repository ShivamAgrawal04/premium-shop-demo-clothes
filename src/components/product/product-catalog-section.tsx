"use client";

import { Suspense } from "react";
import { ProductCatalog } from "./product-catalog";

interface ProductCatalogSectionProps {
  /** Lock collection filter (e.g. wedding / formal) */
  lockedCollection?: string;
  /** Only newArrival items */
  newArrivalsOnly?: boolean;
  emptyLabel?: string;
}

function CatalogSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <div className="hidden lg:col-span-3 lg:block">
        <div className="h-[420px] animate-pulse rounded-md border border-border bg-secondary/50" />
      </div>
      <div className="lg:col-span-9">
        <div className="mb-6 h-10 max-w-sm animate-pulse rounded-md bg-secondary/50" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] animate-pulse rounded-md bg-secondary/40"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductCatalogSection(props: ProductCatalogSectionProps) {
  return (
    <Suspense fallback={<CatalogSkeleton />}>
      <ProductCatalog {...props} />
    </Suspense>
  );
}
