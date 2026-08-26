"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getCatalogProducts } from "@/data/catalog";
import {
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
  filterProducts,
  getCatalogFacets,
  paginateProducts,
  sortProducts,
  type CatalogFilters,
  type CatalogSort,
} from "@/lib/catalog";
import { cn, formatCurrency } from "@/lib/utils";

interface ProductCatalogProps {
  lockedCollection?: string;
  newArrivalsOnly?: boolean;
  emptyLabel?: string;
}

function parseFilters(params: URLSearchParams, lockedCollection?: string): CatalogFilters {
  const min = params.get("min");
  const max = params.get("max");
  return {
    q: params.get("q") ?? "",
    collection: lockedCollection || params.get("collection") || "",
    category: params.get("category") || "",
    occasion: params.get("occasion") || "",
    material: params.get("material") || "",
    availability: params.get("availability") || "",
    size: params.get("size") || "",
    minPrice: min ? Number(min) : null,
    maxPrice: max ? Number(max) : null,
    sort: (params.get("sort") as CatalogSort) || "featured",
  };
}

function FiltersPanel({
  filters,
  facets,
  lockedCollection,
  onChange,
  onClear,
}: {
  filters: CatalogFilters;
  facets: ReturnType<typeof getCatalogFacets>;
  lockedCollection?: string;
  onChange: (patch: Partial<CatalogFilters>) => void;
  onClear: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          Filters
        </p>
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-brand hover:underline"
        >
          Clear all
        </button>
      </div>

      {!lockedCollection && (
        <FilterSelect
          label="Collection"
          value={filters.collection}
          options={facets.collections}
          onChange={(collection) => onChange({ collection })}
        />
      )}

      <FilterSelect
        label="Category"
        value={filters.category}
        options={facets.categories}
        onChange={(category) => onChange({ category })}
      />

      <FilterSelect
        label="Occasion"
        value={filters.occasion}
        options={facets.occasions}
        onChange={(occasion) => onChange({ occasion })}
      />

      <FilterSelect
        label="Material"
        value={filters.material}
        options={facets.materials}
        onChange={(material) => onChange({ material })}
      />

      <FilterSelect
        label="Size"
        value={filters.size}
        options={facets.sizes}
        onChange={(size) => onChange({ size })}
      />

      <FilterSelect
        label="Availability"
        value={filters.availability}
        options={facets.availability}
        onChange={(availability) => onChange({ availability })}
      />

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Price (₹)
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            inputMode="numeric"
            placeholder={`Min ${facets.priceMin}`}
            value={filters.minPrice ?? ""}
            onChange={(e) =>
              onChange({
                minPrice: e.target.value ? Number(e.target.value) : null,
              })
            }
          />
          <Input
            type="number"
            inputMode="numeric"
            placeholder={`Max ${facets.priceMax}`}
            value={filters.maxPrice ?? ""}
            onChange={(e) =>
              onChange({
                maxPrice: e.target.value ? Number(e.target.value) : null,
              })
            }
          />
        </div>
      </div>
    </div>
  );
}

const AVAILABILITY_LABELS: Record<string, string> = {
  "in-stock": "In Stock",
  limited: "Limited",
  "made-to-order": "Made to Order",
};

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <Select
        value={value || "__all__"}
        onValueChange={(v) => onChange(v === "__all__" ? "" : v)}
      >
        <SelectTrigger>
          <SelectValue placeholder={`All ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__all__">All</SelectItem>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {AVAILABILITY_LABELS[opt] ?? opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function ProductCatalog({
  lockedCollection,
  newArrivalsOnly,
  emptyLabel = "No products match these filters.",
}: ProductCatalogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const products = React.useMemo(() => {
    let list = getCatalogProducts();
    if (lockedCollection) {
      list = list.filter((p) => p.collection === lockedCollection);
    }
    if (newArrivalsOnly) {
      list = list.filter((p) => p.newArrival);
    }
    return list;
  }, [lockedCollection, newArrivalsOnly]);

  const filters = React.useMemo(
    () => parseFilters(searchParams, lockedCollection),
    [searchParams, lockedCollection]
  );
  const page = Math.max(1, Number(searchParams.get("page") || "1") || 1);
  const pageSize = PAGE_SIZE_OPTIONS.includes(
    Number(searchParams.get("per")) as (typeof PAGE_SIZE_OPTIONS)[number]
  )
    ? Number(searchParams.get("per"))
    : DEFAULT_PAGE_SIZE;

  const deferredQ = React.useDeferredValue(filters.q);
  const activeFilters = React.useMemo(
    () => ({ ...filters, q: deferredQ }),
    [filters, deferredQ]
  );

  const facets = React.useMemo(() => getCatalogFacets(products), [products]);

  const filtered = React.useMemo(() => {
    const next = filterProducts(products, activeFilters);
    return sortProducts(next, activeFilters.sort);
  }, [products, activeFilters]);

  const { pageItems, totalPages, page: safePage, total } = React.useMemo(
    () => paginateProducts(filtered, page, pageSize),
    [filtered, page, pageSize]
  );

  const writeParams = React.useCallback(
    (patch: Record<string, string | null>, resetPage = true) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(patch).forEach(([key, value]) => {
        if (!value) params.delete(key);
        else params.set(key, value);
      });
      if (resetPage) params.delete("page");
      if (lockedCollection) params.delete("collection");
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams, lockedCollection]
  );

  const applyFilterPatch = (patch: Partial<CatalogFilters>) => {
    const next: Record<string, string | null> = {};
    if ("q" in patch) next.q = patch.q || null;
    if ("collection" in patch) next.collection = patch.collection || null;
    if ("category" in patch) next.category = patch.category || null;
    if ("occasion" in patch) next.occasion = patch.occasion || null;
    if ("material" in patch) next.material = patch.material || null;
    if ("availability" in patch) next.availability = patch.availability || null;
    if ("size" in patch) next.size = patch.size || null;
    if ("minPrice" in patch)
      next.min = patch.minPrice != null ? String(patch.minPrice) : null;
    if ("maxPrice" in patch)
      next.max = patch.maxPrice != null ? String(patch.maxPrice) : null;
    if ("sort" in patch) next.sort = patch.sort || "featured";
    writeParams(next, true);
  };

  const clearFilters = () => {
    const params = new URLSearchParams();
    if (filters.sort !== "featured") params.set("sort", filters.sort);
    if (pageSize !== DEFAULT_PAGE_SIZE) params.set("per", String(pageSize));
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const setPage = (nextPage: number) => {
    writeParams({ page: nextPage <= 1 ? null : String(nextPage) }, false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeChipCount = [
    filters.collection && !lockedCollection,
    filters.category,
    filters.occasion,
    filters.material,
    filters.availability,
    filters.size,
    filters.minPrice != null,
    filters.maxPrice != null,
    filters.q,
  ].filter(Boolean).length;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <aside className="hidden lg:col-span-3 lg:block">
        <div className="sticky top-28 rounded-md border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
          <FiltersPanel
            filters={filters}
            facets={facets}
            lockedCollection={lockedCollection}
            onChange={applyFilterPatch}
            onClear={clearFilters}
          />
        </div>
      </aside>

      <div className="lg:col-span-9">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={filters.q}
              onChange={(e) => applyFilterPatch({ q: e.target.value })}
              placeholder="Search products…"
              className="pl-9"
              aria-label="Search products"
            />
            {filters.q && (
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
                onClick={() => applyFilterPatch({ q: "" })}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <Filter className="h-4 w-4" />
                  Filters
                  {activeChipCount > 0 && (
                    <span className="rounded-full bg-brand px-1.5 text-[10px] text-brand-foreground">
                      {activeChipCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[320px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2 font-display text-xl tracking-wide">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FiltersPanel
                    filters={filters}
                    facets={facets}
                    lockedCollection={lockedCollection}
                    onChange={applyFilterPatch}
                    onClear={clearFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>

            <Select
              value={filters.sort}
              onValueChange={(sort) =>
                applyFilterPatch({ sort: sort as CatalogSort })
              }
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low–High</SelectItem>
                <SelectItem value="price-desc">Price: High–Low</SelectItem>
                <SelectItem value="name-asc">Name A–Z</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={String(pageSize)}
              onValueChange={(per) => {
                writeParams({ per: per === String(DEFAULT_PAGE_SIZE) ? null : per, page: null });
              }}
            >
              <SelectTrigger className="w-[110px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZE_OPTIONS.map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n} / page
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <p className="mb-6 text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">
            {total === 0 ? 0 : (safePage - 1) * pageSize + 1}–
            {Math.min(safePage * pageSize, total)}
          </span>{" "}
          of <span className="font-medium text-foreground">{total}</span> pieces
          {activeChipCount > 0 ? " (filtered)" : ""}
        </p>

        {pageItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12">
            {pageItems.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={Math.min(index, 8)}
              />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-border py-20 text-center">
            <p className="text-muted-foreground">{emptyLabel}</p>
            <Button variant="outline" className="mt-4" onClick={clearFilters}>
              Reset filters
            </Button>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              Page {safePage} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={safePage <= 1}
                onClick={() => setPage(safePage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
                Prev
              </Button>
              <div className="flex items-center gap-1">
                {getPageWindow(safePage, totalPages).map((p, i) =>
                  p === "…" ? (
                    <span key={`ellipsis-${i}`} className="px-2 text-muted-foreground">
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPage(p as number)}
                      className={cn(
                        "h-9 w-9 text-sm transition-colors",
                        p === safePage
                          ? "bg-foreground text-background"
                          : "hover:bg-secondary"
                      )}
                    >
                      {p}
                    </button>
                  )
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={safePage >= totalPages}
                onClick={() => setPage(safePage + 1)}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        <p className="mt-6 text-center text-[11px] text-muted-foreground/70">
          Client-side catalog · filters & pagination work without a backend ·
          price range {formatCurrency(facets.priceMin)} –{" "}
          {formatCurrency(facets.priceMax)}
        </p>
      </div>
    </div>
  );
}

function getPageWindow(
  current: number,
  total: number
): Array<number | "…"> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, current, current - 1, current + 1]);
  if (current <= 3) [2, 3, 4].forEach((p) => pages.add(p));
  if (current >= total - 2) [total - 3, total - 2, total - 1].forEach((p) => pages.add(p));
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: Array<number | "…"> = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) out.push("…");
    out.push(p);
    prev = p;
  }
  return out;
}
