import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { whatsappGeneralInquiry } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        {/* Main footer */}
        <div className="grid grid-cols-1 gap-10 pt-20 pb-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-5 lg:pr-12">
            <h3 className="font-display text-lg tracking-[0.25em] uppercase">
              {siteConfig.name}
            </h3>
            <p className="mt-3 text-sm text-background/50 leading-relaxed max-w-sm">
              {siteConfig.tagline}. {siteConfig.description}
            </p>
            <p className="mt-5 text-xs text-background/35 leading-relaxed">
              {siteConfig.location.address}
            </p>
            <a
              href={whatsappGeneralInquiry()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-background/60 hover:text-brand transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Shop */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-background/30 mb-5">
              Shop
            </h4>
            <ul className="space-y-3">
              {navigation.footer.shop.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-background/55 hover:text-background transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-background/30 mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {navigation.footer.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-background/55 hover:text-background transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-background/30 mb-5">
              Help
            </h4>
            <ul className="space-y-3">
              {navigation.footer.help.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-background/55 hover:text-background transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-1">
              <p className="text-xs text-background/30">
                {siteConfig.location.phone}
              </p>
              <p className="text-xs text-background/30">
                {siteConfig.location.email}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/8 py-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-[11px] text-background/25">
            © 2026 {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-[11px] text-background/20">
            Demo website for demonstration purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
