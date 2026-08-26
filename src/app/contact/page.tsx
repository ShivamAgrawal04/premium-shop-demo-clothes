import Link from "next/link";
import { MapPin, Phone, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { StoreMap } from "@/components/shared/store-map";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { siteConfig } from "@/config/site";
import { whatsappGeneralInquiry } from "@/lib/whatsapp";
import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "Contact Us",
  description: `Visit ${siteConfig.name} at Katra Mohalla, Hanuman Bazariya, Bhind. Call or WhatsApp ${siteConfig.location.phone}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Find us at Katra Mohalla, Hanuman Bazariya, Bhind — or message us on WhatsApp."
      />
      <div className="px-6 pb-20 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10">
                  <MapPin className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <h3 className="font-medium">Store Address</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {siteConfig.location.address}
                  </p>
                  <a
                    href={siteConfig.location.mapsOpenUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-brand hover:underline"
                  >
                    Open in Google Maps
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10">
                  <Phone className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <h3 className="font-medium">Phone & WhatsApp</h3>
                  <a
                    href={siteConfig.location.phoneHref}
                    className="mt-1 block text-sm text-muted-foreground hover:text-foreground"
                  >
                    {siteConfig.location.phone}
                  </a>
                  <p className="text-sm text-muted-foreground">
                    {siteConfig.location.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10">
                  <Clock className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <h3 className="font-medium">Store Hours</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Monday – Friday: {siteConfig.hours.weekdays}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Saturday – Sunday: {siteConfig.hours.weekends}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="brand">
                <a
                  href={whatsappGeneralInquiry()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp Us
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link href="/book-appointment">
                  Book an Appointment
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <StoreMap className="min-h-[420px] border border-border shadow-[var(--shadow-soft)]" />
        </div>
      </div>
    </>
  );
}
