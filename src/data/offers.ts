export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  collection?: string;
  code?: string;
  validUntil: string;
}

export const offers: Offer[] = [
  {
    id: "off-001",
    title: "Wedding Edit",
    description: "Up to 20% off on our curated wedding collection. Invest in the look that lasts a lifetime.",
    discount: "Up to 20% Off",
    collection: "wedding",
    code: "WEDDING20",
    validUntil: "March 2026",
  },
  {
    id: "off-002",
    title: "Festive Season",
    description: "Celebrate in style with special pricing on ethnic wear. Kurtas, bandhgalas and accessories.",
    discount: "Up to 15% Off",
    collection: "ethnic",
    code: "FESTIVE15",
    validUntil: "April 2026",
  },
  {
    id: "off-003",
    title: "Blazer Collection",
    description: "Selected blazers at special pricing. Upgrade your formal wardrobe.",
    discount: "Starting at ₹6,999",
    collection: "formal",
    validUntil: "While stocks last",
  },
  {
    id: "off-004",
    title: "New Season Casuals",
    description: "Fresh arrivals in casual wear. Premium fabrics, relaxed fits, refined details.",
    discount: "10% Off First Purchase",
    collection: "casual",
    code: "NEWSEASON",
    validUntil: "March 2026",
  },
];
