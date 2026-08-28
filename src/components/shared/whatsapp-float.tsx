"use client";

import { whatsappGeneralInquiry } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";

/** Static float button — no ping or spring (smooth on mobile). */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappGeneralInquiry()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-colors hover:bg-[#20BD5A] sm:bottom-6 sm:right-6"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
