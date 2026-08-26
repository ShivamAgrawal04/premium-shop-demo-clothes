"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { cn, formatCurrency } from "@/lib/utils";
import { whatsappProductInquiry } from "@/lib/whatsapp";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
  /** Slightly shorter image for dense home grids */
  compact?: boolean;
}

const badgeVariant: Record<string, "new" | "limited" | "bestseller" | "sale"> =
  {
    NEW: "new",
    LIMITED: "limited",
    BESTSELLER: "bestseller",
    SALE: "sale",
  };

export function ProductCard({ product, index = 0, compact = false }: ProductCardProps) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative">
        <Link href={`/products/${product.slug}`} className="block">
          <div
            className={cn(
              "relative overflow-hidden bg-secondary",
              compact ? "aspect-[4/5]" : "aspect-[3/4]"
            )}
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes={
                compact
                  ? "(min-width: 640px) 200px, 45vw"
                  : "(min-width: 1024px) 23vw, (min-width: 640px) 30vw, 50vw"
              }
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />

            {product.badge && (
              <div className="absolute top-3 left-3 z-10">
                <Badge variant={badgeVariant[product.badge]}>
                  {product.badge}
                </Badge>
              </div>
            )}
          </div>

          <div className="mt-4 space-y-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-medium leading-tight line-clamp-1 group-hover:text-brand transition-colors">
                {product.name}
              </h3>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-brand transition-colors mt-0.5" />
            </div>
            <p className="text-xs text-muted-foreground">{product.material}</p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">
                {formatCurrency(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatCurrency(product.compareAtPrice)}
                </span>
              )}
            </div>
          </div>
        </Link>

        {/* WhatsApp CTA — sibling of Link, not nested */}
        <div
          className={cn(
            "absolute bottom-24 left-0 right-0 px-4 transition-all duration-300 ease-out",
            hovered
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0 pointer-events-none",
          )}
          style={{
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        >
          <a
            href={whatsappProductInquiry(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex h-9 w-full items-center justify-center gap-2 rounded-md bg-[#25D366] text-xs font-medium text-white transition-colors hover:bg-[#20BD5A]"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
}
