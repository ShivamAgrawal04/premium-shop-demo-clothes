export const siteConfig = {
  name: "The Gentleman Store",
  tagline: "The Art of Dressing Well",
  description:
    "Premium menswear for weddings, celebrations and every occasion worth dressing for. Located at Katra Mohalla, Hanuman Bazariya, Bhind, Madhya Pradesh.",
  url: "https://thegentlemanstore.in",
  location: {
    city: "Bhind",
    state: "Madhya Pradesh",
    country: "India",
    address: "Katra Mohalla, Hanuman Bazariya, Bhind, Madhya Pradesh",
    landmark: "Katra Mohalla, Hanuman Bazariya",
    phone: "+91 93997 39395",
    phoneHref: "tel:+919399739395",
    whatsapp: "+91 93997 39395",
    email: "hello@thegentlemanstore.in",
    mapsQuery:
      "Katra Mohalla Hanuman Bazariya Bhind Madhya Pradesh",
    mapsEmbedUrl:
      "https://maps.google.com/maps?q=Katra%20Mohalla%2C%20Hanuman%20Bazariya%2C%20Bhind%2C%20Madhya%20Pradesh&z=16&output=embed",
    mapsOpenUrl:
      "https://www.google.com/maps/search/?api=1&query=Katra%20Mohalla%2C%20Hanuman%20Bazariya%2C%20Bhind%2C%20Madhya%20Pradesh",
  },
  hours: {
    weekdays: "10:00 AM – 9:00 PM",
    weekends: "10:00 AM – 10:00 PM",
  },
  social: {
    instagram: "https://instagram.com/thegentlemanstore",
    facebook: "https://facebook.com/thegentlemanstore",
  },
  /** WhatsApp wa.me number without + or spaces */
  whatsappNumber: "919399739395",
};

export type SiteConfig = typeof siteConfig;
