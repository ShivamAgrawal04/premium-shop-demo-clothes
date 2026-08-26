export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  heroImage: string;
  image: string;
  tagline: string;
}

export const collections: Collection[] = [
  {
    id: "col-001",
    slug: "wedding",
    name: "Wedding",
    description: "Handcrafted pieces for the most important celebrations of your life. From sherwanis to bandhgalas, every detail is considered.",
    heroImage: "/images/collections/wedding-hero.jpg",
    image: "/images/collections/wedding.jpg",
    tagline: "Made for the moments that deserve more.",
  },
  {
    id: "col-002",
    slug: "formal",
    name: "Formal",
    description: "Suits, blazers and shirts for the man who commands the room. Precision tailoring meets timeless style.",
    heroImage: "/images/collections/formal-hero.jpg",
    image: "/images/collections/formal.jpg",
    tagline: "Dress for the position you want.",
  },
  {
    id: "col-003",
    slug: "casual",
    name: "Casual",
    description: "Refined casual wear for weekends, travel and everyday life. Effortlessly polished, never overdressed.",
    heroImage: "/images/collections/casual-hero.jpg",
    image: "/images/collections/casual.jpg",
    tagline: "Style without trying too hard.",
  },
  {
    id: "col-004",
    slug: "party",
    name: "Party",
    description: "Statement pieces for evenings that call for something special. Velvet, silk and bold colour.",
    heroImage: "/images/collections/party-hero.jpg",
    image: "/images/collections/party.jpg",
    tagline: "Own the night.",
  },
  {
    id: "col-005",
    slug: "ethnic",
    name: "Ethnic",
    description: "Contemporary Indian wear rooted in tradition. Kurtas, bandhgalas and fusion pieces for the modern Indian man.",
    heroImage: "/images/collections/ethnic-hero.jpg",
    image: "/images/collections/ethnic.jpg",
    tagline: "Heritage, reimagined.",
  },
  {
    id: "col-006",
    slug: "suits",
    name: "Suits",
    description: "Power dressing defined. Two-piece and three-piece suits in premium fabrics with modern tailoring.",
    heroImage: "/images/collections/suits-hero.jpg",
    image: "/images/collections/suits.jpg",
    tagline: "The suit makes the man.",
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
