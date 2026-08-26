export const siteConfig = {
  name: "The Gentleman Store",
  tagline: "The Art of Dressing Well",
  description:
    "Premium menswear for weddings, celebrations and every occasion worth dressing for. Located in Bhopal, Madhya Pradesh.",
  url: "https://thegentlemanstore.in",
  location: {
    city: "Bhopal",
    state: "Madhya Pradesh",
    country: "India",
    address: "123, MP Nagar, Zone II, Bhopal, Madhya Pradesh 462011",
    phone: "+91 755 123 4567",
    whatsapp: "+91 98765 43210",
    email: "hello@thegentlemanstore.in",
  },
  hours: {
    weekdays: "10:00 AM – 9:00 PM",
    weekends: "10:00 AM – 10:00 PM",
  },
  social: {
    instagram: "https://instagram.com/thegentlemanstore",
    facebook: "https://facebook.com/thegentlemanstore",
  },
  whatsappNumber: "919876543210",
};

export type SiteConfig = typeof siteConfig;
