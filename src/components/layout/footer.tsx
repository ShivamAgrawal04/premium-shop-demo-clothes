import Link from "next/link";
import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { whatsappGeneralInquiry } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50 text-foreground">
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <div className="grid grid-cols-1 gap-10 pb-12 pt-16 sm:grid-cols-2 lg:grid-cols-12 lg:pt-20">
          <div className="sm:col-span-2 lg:col-span-5 lg:pr-12">
            <h3 className="font-display text-lg uppercase tracking-[0.25em]">
              {siteConfig.name}
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.tagline}. {siteConfig.description}
            </p>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground/80">
              {siteConfig.location.address}
            </p>
            <a
              href={whatsappGeneralInquiry()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-brand"
            >
              <WhatsAppIcon className="h-3.5 w-3.5 text-[#25D366]" />
              Chat on WhatsApp
            </a>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-5 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Shop
            </h4>
            <ul className="space-y-3">
              {navigation.footer.shop.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-5 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Company
            </h4>
            <ul className="space-y-3">
              {navigation.footer.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-5 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Help
            </h4>
            <ul className="space-y-3">
              {navigation.footer.help.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-1">
              <a
                href={siteConfig.location.phoneHref}
                className="block text-xs text-muted-foreground hover:text-foreground"
              >
                {siteConfig.location.phone}
              </a>
              <p className="text-xs text-muted-foreground">
                {siteConfig.location.email}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border py-6 sm:flex-row">
          <p className="text-[11px] text-muted-foreground">
            © 2026 {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-[11px] text-muted-foreground/70">
            Demo website for demonstration purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
