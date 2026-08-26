"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency } from "@/lib/utils";
import { whatsappProductInquiry } from "@/lib/whatsapp";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const badgeVariant: Record<string, "new" | "limited" | "bestseller" | "sale"> =
  {
    NEW: "new",
    LIMITED: "limited",
    BESTSELLER: "bestseller",
    SALE: "sale",
  };

export function ProductCard({ product, index = 0 }: ProductCardProps) {
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
          <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 23vw, (min-width: 640px) 30vw, 50vw"
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
            className="flex items-center justify-center gap-2 w-full h-9 rounded-md bg-brand text-brand-foreground text-xs font-medium hover:bg-brand/90 transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
}
