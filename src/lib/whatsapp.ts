import { siteConfig } from "@/config/site";
import { generateWhatsAppUrl } from "./utils";

const number = siteConfig.whatsappNumber;

export function whatsappProductInquiry(productName: string): string {
  const message = `Hi, I'm interested in the "${productName}" at The Gentleman Store. Could you share more details and availability?`;
  return generateWhatsAppUrl(number, message);
}

export function whatsappWeddingInquiry(): string {
  const message = `Hello! I'm looking for wedding attire at The Gentleman Store. I'd love to explore your wedding collection and discuss options. Thank you!`;
  return generateWhatsAppUrl(number, message);
}

export function whatsappGeneralInquiry(): string {
  const message = `Hi! I have a query about The Gentleman Store. Could someone please assist me?`;
  return generateWhatsAppUrl(number, message);
}

export function whatsappAppointmentRequest(): string {
  const message = `Hello! I'd like to book an appointment at The Gentleman Store. Could you please suggest available slots? Thank you!`;
  return generateWhatsAppUrl(number, message);
}

export function whatsappStoreVisit(): string {
  const message = `Hi! I'd like to visit The Gentleman Store at ${siteConfig.location.address}. Are you open right now?`;
  return generateWhatsAppUrl(number, message);
}
