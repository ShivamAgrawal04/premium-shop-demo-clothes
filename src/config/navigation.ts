export const navigation = {
  main: [
    { label: "Shop", href: "/shop" },
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Collections", href: "/collections" },
    { label: "Wedding", href: "/wedding" },
    { label: "Offers", href: "/offers" },
    { label: "About", href: "/about" },
  ] as const,
  collections: [
    { label: "Wedding", href: "/collections/wedding", slug: "wedding" },
    { label: "Formal", href: "/collections/formal", slug: "formal" },
    { label: "Casual", href: "/collections/casual", slug: "casual" },
    { label: "Party", href: "/collections/party", slug: "party" },
    { label: "Ethnic", href: "/collections/ethnic", slug: "ethnic" },
    { label: "Suits", href: "/collections/suits", slug: "suits" },
  ] as const,
  footer: {
    shop: [
      { label: "Shop All", href: "/shop" },
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Wedding Collection", href: "/wedding" },
      { label: "Formal Wear", href: "/collections/formal" },
      { label: "Casual Collection", href: "/collections/casual" },
      { label: "Ethnic Wear", href: "/collections/ethnic" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Store Location", href: "/contact" },
      { label: "Book Appointment", href: "/book-appointment" },
      { label: "Enquiry", href: "/enquiry" },
    ],
    help: [
      { label: "Size Guide", href: "/size-guide" },
      { label: "Contact Us", href: "/contact" },
      { label: "Book a Visit", href: "/book-appointment" },
      { label: "Enquiry", href: "/enquiry" },
    ],
  },
} as const;
