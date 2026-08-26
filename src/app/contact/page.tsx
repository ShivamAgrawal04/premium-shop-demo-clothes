import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { siteConfig } from "@/config/site";
import { whatsappGeneralInquiry } from "@/lib/whatsapp";
import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "Contact Us",
  description: `Visit or contact ${siteConfig.name} in ${siteConfig.location.city}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        description="We would love to hear from you."
      />
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10">
                  <MapPin className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <h3 className="font-medium">Store Address</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {siteConfig.location.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10">
                  <Phone className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {siteConfig.location.phone}
                  </p>
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
                  <p className="text-sm text-muted-foreground mt-1">
                    Monday – Friday: {siteConfig.hours.weekdays}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Saturday – Sunday: {siteConfig.hours.weekends}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="brand">
                <a
                  href={whatsappGeneralInquiry()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
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

          {/* Store location */}
          <div className="aspect-square lg:aspect-auto bg-secondary rounded-lg overflow-hidden">
            <Image
              src="/images/editorial/store.jpg"
              alt="The Gentleman Store - premium menswear store interior"
              fill
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </>
  );
}
