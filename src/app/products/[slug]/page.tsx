import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, MapPin, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { products, getProductBySlug, formatPrice } from "@/data/products";
import { whatsappProductInquiry } from "@/lib/whatsapp";
import { generateMetadata as genMeta, generateProductJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return genMeta({
    title: product.name,
    description: product.description,
    path: `/products/${product.slug}`,
  });
}

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

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const breadcrumbLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Products", url: "/collections" },
    { name: product.name, url: `/products/${product.slug}` },
  ]);

  const productLd = generateProductJsonLd({
    name: product.name,
    description: product.description,
    price: product.price,
    currency: product.currency,
    slug: product.slug,
    images: product.images,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />

      <div className="pt-24 pb-16 lg:pt-28">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Collections
            </Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Gallery */}
            <div>
              <div className="relative aspect-[3/4] bg-secondary overflow-hidden sticky top-24">
                <Image
                  src={product.images[1] || product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <Badge variant={badgeVariant[product.badge]}>
                      {product.badge}
                    </Badge>
                  </div>
                )}
              </div>
              {/* Thumbnail strip */}
              {product.images.length > 1 && (
                <div className="mt-3 flex gap-2">
                  {product.images.map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-square w-16 overflow-hidden bg-secondary rounded-sm"
                    >
                      <Image
                        src={img}
                        alt={`${product.name} view ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="space-y-6">
                {/* Category */}
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {product.category}
                </p>

                {/* Name */}
                <h1 className="font-display text-3xl sm:text-4xl tracking-wide">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-semibold">
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                </div>

                <Separator />

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>

                {/* Details */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground w-24">Material</span>
                    <span>{product.material}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground w-24">Occasion</span>
                    <span className="capitalize">{product.occasion}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground w-24">Status</span>
                    <span className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      {availabilityLabel[product.availability]}
                    </span>
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <p className="text-sm font-medium mb-2">Available Sizes</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <span
                        key={size}
                        className="inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-md border px-3 text-sm"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <p className="text-sm font-medium mb-2">Available Colors</p>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <div key={color.name} className="flex items-center gap-2">
                        <div
                          className="h-5 w-5 rounded-full border"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-sm">{color.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* CTAs */}
                <div className="space-y-3">
                  <Button
                    asChild
                    size="lg"
                    variant="brand"
                    className="w-full"
                  >
                    <a
                      href={whatsappProductInquiry(product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Ask on WhatsApp
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full">
                    <Link href="/book-appointment">
                      <MapPin className="h-4 w-4" />
                      Book a Store Visit
                    </Link>
                  </Button>
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-muted-foreground/60 text-center">
                  Demo product. Contact store for actual availability and pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
