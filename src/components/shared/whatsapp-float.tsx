"use client";

import { motion } from "motion/react";
import { whatsappGeneralInquiry } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={whatsappGeneralInquiry()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-colors hover:bg-[#20BD5A] sm:bottom-6 sm:right-6"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      aria-label="Chat on WhatsApp"
    >
      <span className="absolute inset-0 rounded-full border-2 border-[#25D366] opacity-30 animate-ping" />
      <svg
        aria-hidden="true"
        className="relative h-7 w-7 fill-none stroke-current"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.5 11.4a8.5 8.5 0 0 1-12.7 7.4L3.5 20l1.2-4.1A8.5 8.5 0 1 1 20.5 11.4Z" />
        <path d="M8.7 8.7c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.6.7c.5 1 1.3 1.8 2.3 2.3l.7-.6c.2-.2.4-.2.6-.1l1.7.7c.3.1.4.3.4.5v.5c0 .3-.1.5-.4.7-.4.3-.9.4-1.3.3a7.1 7.1 0 0 1-5.8-5.8c-.1-.4 0-.9.3-1.3Z" />
      </svg>
    </motion.a>
  );
}