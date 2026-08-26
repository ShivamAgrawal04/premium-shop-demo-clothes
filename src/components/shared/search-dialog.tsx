"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight, Command } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getCatalogProducts } from "@/data/catalog";
import { formatCurrency } from "@/lib/utils";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const catalog = React.useMemo(() => getCatalogProducts(), []);

  React.useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    const t = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => window.clearTimeout(t);
  }, [open]);

  const normalized = query.trim().toLowerCase();
  const results = React.useDeferredValue(
    normalized
      ? catalog
          .filter((product) =>
            [
              product.name,
              product.category,
              product.collection,
              product.material,
              product.occasion,
              product.description,
            ]
              .join(" ")
              .toLowerCase()
              .includes(normalized)
          )
          .slice(0, 10)
      : catalog.filter((p) => p.featured).slice(0, 6)
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[10%] max-w-2xl translate-y-0 gap-0 overflow-hidden border-border/70 p-0 sm:top-[14%]">
        <DialogHeader className="space-y-1 border-b border-border/60 px-5 pb-4 pt-5">
          <DialogTitle className="font-display text-2xl tracking-wide">
            Search the store
          </DialogTitle>
          <DialogDescription>
            Find pieces by name, fabric, occasion, or collection.
          </DialogDescription>
        </DialogHeader>

        <div className="relative border-b border-border/60 px-5 py-4">
          <Search className="pointer-events-none absolute left-8 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try sherwani, silk, wedding, navy…"
            className="h-12 w-full border border-input bg-background pl-10 pr-24 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Search products"
          />
          <kbd className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded border border-border bg-secondary px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground sm:inline-flex">
            <Command className="h-3 w-3" />K
          </kbd>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-2">
          {results.length > 0 ? (
            results.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                onClick={() => onOpenChange(false)}
                className="group flex items-center gap-4 rounded-md px-3 py-3 hover:bg-secondary"
              >
                <div className="relative h-14 w-11 shrink-0 overflow-hidden bg-secondary">
                  <Image
                    src={product.images[0]}
                    alt=""
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium group-hover:text-brand">
                    {product.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {product.category} · {product.material}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium">
                    {formatCurrency(product.price)}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-brand" />
                </div>
              </Link>
            ))
          ) : (
            <p className="px-3 py-10 text-center text-sm text-muted-foreground">
              No pieces match “{query}”. Try another fabric or occasion.
            </p>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border/60 bg-secondary/40 px-5 py-3 text-[11px] text-muted-foreground">
          <span>{results.length} results</span>
          <Link
            href={normalized ? `/shop?q=${encodeURIComponent(query.trim())}` : "/shop"}
            onClick={() => onOpenChange(false)}
            className="inline-flex items-center gap-1 hover:text-foreground"
          >
            Browse full shop
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
