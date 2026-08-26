"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ChevronDown,
  MapPin,
  Package,
  Ruler,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { formatPrice } from "@/data/products";
import type { EnrichedProduct } from "@/lib/product-media";
import { whatsappProductInquiry } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const badgeVariant: Record<string, "new" | "limited" | "bestseller" | "sale"> = {
  NEW: "new",
  LIMITED: "limited",
  BESTSELLER: "bestseller",
  SALE: "sale",
};

const availabilityLabel: Record<string, string> = {
  "in-stock": "In Stock",
  limited: "Limited Availability",
  "made-to-order": "Made to Order",
};

interface ProductViewProps {
  product: EnrichedProduct;
}

export function ProductView({ product }: ProductViewProps) {
  const [colorIndex, setColorIndex] = React.useState(0);
  const [imageIndex, setImageIndex] = React.useState(0);
  const [size, setSize] = React.useState(product.sizes[0] ?? "");

  const activeColor = product.colors[colorIndex] ?? product.colors[0];
  const gallery = activeColor?.images?.length
    ? activeColor.images
    : product.images;
  const activeImage =
    gallery[Math.min(imageIndex, gallery.length - 1)] ?? gallery[0];

  const selectColor = (index: number) => {
    setColorIndex(index);
    setImageIndex(0);
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
      {/* Gallery */}
      <div className="lg:col-span-5">
        <div className="flex gap-3">
          {gallery.length > 1 && (
            <div className="hidden w-[72px] shrink-0 flex-col gap-2 sm:flex">
              {gallery.map((img, i) => (
                <button
                  key={`${activeColor.name}-${img}-${i}`}
                  type="button"
                  onClick={() => setImageIndex(i)}
                  className={cn(
                    "relative aspect-square overflow-hidden border bg-secondary transition-colors",
                    i === imageIndex
                      ? "border-foreground"
                      : "border-transparent hover:border-border"
                  )}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="72px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="relative w-full flex-1">
            <div className="relative aspect-[4/5] max-h-[640px] overflow-hidden bg-secondary">
              <Image
                src={activeImage}
                alt={`${product.name} — ${activeColor.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
              {product.badge && (
                <div className="absolute left-3 top-3 z-10">
                  <Badge variant={badgeVariant[product.badge]}>
                    {product.badge}
                  </Badge>
                </div>
              )}
            </div>

            <div className="mt-3 flex gap-2 sm:hidden">
              {gallery.map((img, i) => (
                <button
                  key={`m-${img}-${i}`}
                  type="button"
                  onClick={() => setImageIndex(i)}
                  className={cn(
                    "relative h-16 w-16 overflow-hidden border bg-secondary",
                    i === imageIndex ? "border-foreground" : "border-transparent"
                  )}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            <p className="mt-3 text-center text-sm text-muted-foreground">
              {activeColor.name} · {imageIndex + 1}/{gallery.length} photos
            </p>
          </div>
        </div>
      </div>

      {/* Buy box */}
      <div className="lg:col-span-7">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
            {product.category}
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight tracking-wide sm:text-5xl">
            {product.name}
          </h1>

          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-semibold tracking-tight">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <>
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
                <span className="rounded bg-brand/15 px-2.5 py-1 text-sm font-medium text-brand">
                  Save {formatPrice(product.compareAtPrice - product.price)}
                </span>
              </>
            )}
          </div>

          <p className="mt-3 flex items-center gap-2 text-base text-emerald-700 dark:text-emerald-400">
            <Check className="h-4 w-4" />
            {availabilityLabel[product.availability]}
          </p>

          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {product.description}
          </p>

          <Separator className="my-7" />

          <div>
            <p className="mb-3 text-base font-medium">
              Color:{" "}
              <span className="font-normal text-muted-foreground">
                {activeColor.name}
              </span>
            </p>
            <div className="flex flex-wrap gap-2.5">
              {product.colors.map((color, i) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => selectColor(i)}
                  className={cn(
                    "flex items-center gap-2.5 border px-3.5 py-2.5 text-base transition-colors",
                    i === colorIndex
                      ? "border-foreground bg-secondary"
                      : "border-border hover:border-foreground/40"
                  )}
                  aria-pressed={i === colorIndex}
                >
                  <span
                    className="h-6 w-6 rounded-full border border-black/10"
                    style={{ backgroundColor: color.hex }}
                  />
                  {color.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-base font-medium">
                Size:{" "}
                <span className="font-normal text-muted-foreground">{size}</span>
              </p>
              <Link
                href="/size-guide"
                className="text-sm font-medium text-brand hover:underline"
              >
                Size guide
              </Link>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={cn(
                    "inline-flex h-11 min-w-[3rem] items-center justify-center border px-3.5 text-base transition-colors",
                    size === s
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground/40"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="brand" className="min-w-[220px]">
              <a
                href={whatsappProductInquiry(product.name, {
                  size,
                  color: activeColor.name,
                })}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Ask on WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/book-appointment">
                <MapPin className="h-5 w-5" />
                Book a Store Visit
              </Link>
            </Button>
          </div>

          <ul className="mt-8 grid gap-3 text-base text-muted-foreground sm:grid-cols-2">
            <li className="flex items-start gap-2.5">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              Authentic store piece — verify in person
            </li>
            <li className="flex items-start gap-2.5">
              <Package className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              Pickup at Katra Mohalla, Bhind
            </li>
            <li className="flex items-start gap-2.5">
              <Ruler className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              Free alteration advice in-store
            </li>
            <li className="flex items-start gap-2.5">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              Styling help on WhatsApp
            </li>
          </ul>
        </div>
      </div>

      <div className="lg:col-span-12">
        <Separator className="mb-8" />
        <div className="grid gap-4 lg:grid-cols-2">
          <DetailPanel title="Product highlights" defaultOpen>
            <ul className="space-y-3 text-base text-muted-foreground">
              {product.highlights.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </DetailPanel>

          <DetailPanel title="Specifications" defaultOpen>
            <dl className="divide-y divide-border text-base">
              {product.specifications.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-2 gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <dt className="text-muted-foreground">{row.label}</dt>
                  <dd className="capitalize text-foreground">{row.value}</dd>
                </div>
              ))}
            </dl>
          </DetailPanel>

          <DetailPanel title="Fit & sizing">
            <p className="text-base leading-relaxed text-muted-foreground">
              {product.fitNotes}
            </p>
            <Link
              href="/size-guide"
              className="mt-4 inline-block text-base font-medium text-brand hover:underline"
            >
              Open full size guide →
            </Link>
          </DetailPanel>

          <DetailPanel title="Care instructions">
            <ul className="list-disc space-y-2 pl-5 text-base text-muted-foreground">
              {product.careInstructions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </DetailPanel>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground/70">
          Demo product. Contact the store for actual availability and pricing.
        </p>
      </div>
    </div>
  );
}

function DetailPanel({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      className="group border border-border bg-card open:shadow-[var(--shadow-soft)]"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-base font-medium marker:content-none [&::-webkit-details-marker]:hidden sm:text-lg">
        {title}
        <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180" />
      </summary>
      <div className="border-t border-border px-5 py-5">{children}</div>
    </details>
  );
}
