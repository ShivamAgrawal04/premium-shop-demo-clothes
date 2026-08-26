import type { Product } from "@/data/products";

export type CatalogSort =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "name-asc";

export interface CatalogFilters {
  q: string;
  collection: string;
  category: string;
  occasion: string;
  material: string;
  availability: string;
  size: string;
  minPrice: number | null;
  maxPrice: number | null;
  sort: CatalogSort;
}

export const DEFAULT_FILTERS: CatalogFilters = {
  q: "",
  collection: "",
  category: "",
  occasion: "",
  material: "",
  availability: "",
  size: "",
  minPrice: null,
  maxPrice: null,
  sort: "featured",
};

export const PAGE_SIZE_OPTIONS = [12, 24, 48] as const;
export const DEFAULT_PAGE_SIZE = 12;

export function filterProducts(
  items: Product[],
  filters: CatalogFilters
): Product[] {
  const q = filters.q.trim().toLowerCase();

  return items.filter((p) => {
    if (filters.collection && p.collection !== filters.collection) return false;
    if (filters.category && p.category !== filters.category) return false;
    if (filters.occasion && p.occasion !== filters.occasion) return false;
    if (filters.material && p.material !== filters.material) return false;
    if (filters.availability && p.availability !== filters.availability)
      return false;
    if (filters.size && !p.sizes.includes(filters.size)) return false;
    if (filters.minPrice != null && p.price < filters.minPrice) return false;
    if (filters.maxPrice != null && p.price > filters.maxPrice) return false;
    if (q) {
      const haystack = [
        p.name,
        p.category,
        p.collection,
        p.material,
        p.occasion,
        p.description,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export function sortProducts(
  items: Product[],
  sort: CatalogSort
): Product[] {
  const list = [...items];
  switch (sort) {
    case "newest":
      return list.sort(
        (a, b) => Number(b.newArrival) - Number(a.newArrival) || b.id.localeCompare(a.id)
      );
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "name-asc":
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case "featured":
    default:
      return list.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          Number(b.bestseller) - Number(a.bestseller) ||
          a.name.localeCompare(b.name)
      );
  }
}

export function paginateProducts<T>(
  items: T[],
  page: number,
  pageSize: number
): { pageItems: T[]; totalPages: number; page: number; total: number } {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    pageItems: items.slice(start, start + pageSize),
    totalPages,
    page: safePage,
    total,
  };
}

export function getCatalogFacets(items: Product[]) {
  const collections = unique(items.map((p) => p.collection));
  const categories = unique(items.map((p) => p.category));
  const occasions = unique(items.map((p) => p.occasion));
  const materials = unique(items.map((p) => p.material));
  const sizes = unique(items.flatMap((p) => p.sizes));
  const availability = unique(items.map((p) => p.availability));
  const prices = items.map((p) => p.price);
  return {
    collections,
    categories,
    occasions,
    materials,
    sizes,
    availability,
    priceMin: prices.length ? Math.min(...prices) : 0,
    priceMax: prices.length ? Math.max(...prices) : 0,
  };
}

function unique(values: string[]): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

/** Build a large demo catalog from base products (no backend). */
export function expandCatalog(
  base: Product[],
  targetCount = 1008
): Product[] {
  if (base.length >= targetCount) return base.slice(0, targetCount);

  const out: Product[] = base.map((p) => ({ ...p }));
  const suffixes = ["Edition", "Cut", "Weave", "Line", "Select", "Reserve"];
  let n = 0;

  while (out.length < targetCount) {
    const src = base[n % base.length];
    const edition = Math.floor(n / base.length) + 1;
    const tag = suffixes[n % suffixes.length];
    const idNum = out.length + 1;
    out.push({
      ...src,
      id: `gen-${idNum}`,
      slug: `${src.slug}-v${edition}-${(n % 9) + 1}`,
      name: `${src.name} · ${tag} ${edition}`,
      price: src.price + ((n * 350) % 4500),
      compareAtPrice: src.compareAtPrice
        ? src.compareAtPrice + ((n * 200) % 2000)
        : undefined,
      featured: n % 11 === 0,
      newArrival: n % 7 === 0,
      bestseller: n % 13 === 0,
      badge:
        n % 17 === 0
          ? "SALE"
          : n % 11 === 0
            ? "NEW"
            : n % 13 === 0
              ? "BESTSELLER"
              : src.badge,
    });
    n += 1;
  }

  return out;
}
