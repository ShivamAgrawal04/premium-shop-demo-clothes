import { products, type Product } from "@/data/products";
import { expandCatalog } from "@/lib/catalog";

let cachedCatalog: Product[] | null = null;

/** Full shop catalog (~1000 items) derived from base products — client/server safe */
export function getCatalogProducts(): Product[] {
  if (!cachedCatalog) {
    cachedCatalog = expandCatalog(products, 1008);
  }
  return cachedCatalog;
}

export function getCatalogProductBySlug(slug: string): Product | undefined {
  return getCatalogProducts().find((p) => p.slug === slug);
}
