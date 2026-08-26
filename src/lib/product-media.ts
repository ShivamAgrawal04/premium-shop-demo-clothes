import type { Product } from "@/data/products";

export interface ProductColorOption {
  name: string;
  hex: string;
  images: string[];
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface EnrichedProduct extends Product {
  colors: ProductColorOption[];
  highlights: string[];
  specifications: ProductSpec[];
  careInstructions: string[];
  fitNotes: string;
}

const POOLS: Record<string, string[]> = {
  Blazers: [
    "/images/products/blazer-1.jpg",
    "/images/products/blazer-2.jpg",
    "/images/products/blazer-3.jpg",
    "/images/products/blazer-4.jpg",
  ],
  Sherwanis: [
    "/images/products/sherwani-1.jpg",
    "/images/products/sherwani-2.jpg",
    "/images/products/sherwani-3.jpg",
    "/images/products/sherwani-4.jpg",
    "/images/products/sherwani-blue.jpg",
  ],
  Suits: [
    "/images/products/suit-1.jpg",
    "/images/products/suit-2.jpg",
    "/images/products/suit-3.jpg",
    "/images/products/suit-4.jpg",
    "/images/products/suit-5.jpg",
  ],
  Ethnic: [
    "/images/products/ethnic-1.jpg",
    "/images/products/ethnic-2.jpg",
    "/images/products/ethnic-3.jpg",
    "/images/products/ethnic-4.jpg",
    "/images/products/ethnic-5.jpg",
  ],
  Shirts: [
    "/images/products/shirt-1.jpg",
    "/images/products/shirt-2.jpg",
    "/images/products/shirt-3.jpg",
    "/images/products/shirt-4.jpg",
  ],
  Kurtas: [
    "/images/products/kurta-1.jpg",
    "/images/products/kurta-2.jpg",
    "/images/products/kurta-3.jpg",
    "/images/products/kurta-4.jpg",
    "/images/products/kurta-5.jpg",
    "/images/products/kurta-6.jpg",
  ],
  Footwear: [
    "/images/products/shoe-1.jpg",
    "/images/products/shoe-2.jpg",
    "/images/products/shoe-3.jpg",
  ],
  Accessories: [
    "/images/products/acc-1.jpg",
    "/images/products/acc-2.jpg",
    "/images/products/acc-3.jpg",
    "/images/products/acc-4.jpg",
    "/images/products/acc-5.jpg",
    "/images/products/acc-6.jpg",
  ],
  Casual: [
    "/images/products/casual-1.jpg",
    "/images/products/casual-2.jpg",
    "/images/products/shirt-1.jpg",
    "/images/products/shirt-2.jpg",
  ],
  Trousers: [
    "/images/products/trouser-1.jpg",
    "/images/products/trouser-2.jpg",
    "/images/products/trouser-3.jpg",
  ],
};

function unique(urls: string[]): string[] {
  return [...new Set(urls.filter(Boolean))];
}

function rotate(list: string[], offset: number): string[] {
  if (!list.length) return list;
  const i = ((offset % list.length) + list.length) % list.length;
  return [...list.slice(i), ...list.slice(0, i)];
}

function poolFor(product: Product): string[] {
  const primary = product.images[0] || "";
  if (primary.includes("/shoe-")) return POOLS.Footwear;
  if (primary.includes("/blazer-")) return POOLS.Blazers;
  if (primary.includes("/sherwani-")) return POOLS.Sherwanis;
  if (primary.includes("/suit-")) return POOLS.Suits;
  if (primary.includes("/ethnic-")) return POOLS.Ethnic;
  if (primary.includes("/shirt-")) return POOLS.Shirts;
  if (primary.includes("/kurta-")) return POOLS.Kurtas;
  if (primary.includes("/acc-")) return POOLS.Accessories;
  if (primary.includes("/casual-")) return POOLS.Casual;
  if (primary.includes("/trouser-")) return POOLS.Trousers;

  const byCategory = POOLS[product.category];
  if (byCategory?.length) return byCategory;
  return product.images;
}

function buildHighlights(product: Product): string[] {
  return [
    `Crafted in ${product.material}`,
    `Ideal for ${product.occasion} occasions`,
    `Sizes ${product.sizes.join(" · ")}`,
    product.availability === "made-to-order"
      ? "Made to order — alterations available in-store"
      : product.availability === "limited"
        ? "Limited stock — visit or WhatsApp to reserve"
        : "In stock — try on at our Bhind store",
    "Personal styling assistance on WhatsApp",
  ];
}

function buildSpecs(product: Product): ProductSpec[] {
  return [
    { label: "Brand", value: "The Gentleman Store" },
    { label: "Category", value: product.category },
    { label: "Collection", value: product.collection },
    { label: "Material", value: product.material },
    { label: "Occasion", value: product.occasion },
    { label: "Available colors", value: product.colors.map((c) => c.name).join(", ") },
    { label: "Available sizes", value: product.sizes.join(", ") },
    {
      label: "Availability",
      value:
        product.availability === "in-stock"
          ? "In Stock"
          : product.availability === "limited"
            ? "Limited"
            : "Made to Order",
    },
    { label: "SKU", value: product.id.toUpperCase() },
    { label: "Country of Origin", value: "India" },
  ];
}

function buildCare(product: Product): string[] {
  const fabric = product.material.toLowerCase();
  if (fabric.includes("silk") || fabric.includes("raw silk")) {
    return [
      "Dry clean only",
      "Store on a padded hanger",
      "Avoid direct sunlight for long periods",
      "Steam lightly — do not iron on high heat",
    ];
  }
  if (fabric.includes("wool") || fabric.includes("tweed")) {
    return [
      "Dry clean recommended",
      "Brush gently after wear",
      "Use a cedar hanger to retain shape",
      "Allow to rest 24 hours between wears",
    ];
  }
  if (fabric.includes("cotton") || fabric.includes("linen")) {
    return [
      "Gentle machine wash or dry clean",
      "Iron on medium heat while slightly damp",
      "Do not bleach",
      "Hang dry preferred",
    ];
  }
  return [
    "Follow care label inside the garment",
    "Dry clean when in doubt",
    "Store in a cool, dry place",
    "Avoid harsh detergents and bleach",
  ];
}

function buildFitNotes(product: Product): string {
  if (product.category === "Sherwanis" || product.category === "Ethnic") {
    return "Classic Indian festive fit with room through the chest and sleeves. In-store measuring recommended for wedding sets.";
  }
  if (product.category === "Suits" || product.category === "Blazers") {
    return "Modern tailored fit — structured shoulders, clean waist. Bring a dress shirt for the most accurate try-on.";
  }
  if (product.category === "Footwear") {
    return "True to size for most customers. If between sizes, we suggest trying both in-store.";
  }
  return "Standard contemporary fit. Visit the store for alterations and personalized sizing advice.";
}

/** Attach multi-angle + per-color galleries and marketplace-style detail blocks. */
export function enrichProduct(product: Product): EnrichedProduct {
  const pool = poolFor(product);
  const primary = product.images[0] || pool[0];
  const baseGallery = unique([primary, ...pool]).slice(0, 4);

  const colors: ProductColorOption[] = product.colors.map((color, index) => {
    const rotated = rotate(pool, index);
    const images =
      index === 0
        ? unique([primary, ...rotated]).slice(0, 4)
        : unique(rotated).slice(0, 4);
    return { name: color.name, hex: color.hex, images };
  });

  if (colors.length === 0) {
    colors.push({ name: "Default", hex: "#1B2A4A", images: baseGallery });
  }

  return {
    ...product,
    images: baseGallery,
    colors,
    highlights: buildHighlights(product),
    specifications: buildSpecs(product),
    careInstructions: buildCare(product),
    fitNotes: buildFitNotes(product),
  };
}
