import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/layout/page-header";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "About Us",
  description: `Learn about ${siteConfig.name}, premium menswear in ${siteConfig.location.city}.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        description="The story behind The Gentleman Store."
      />
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 pb-20">
        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <div className="aspect-[4/5] bg-secondary relative overflow-hidden">
            <Image
              src="/images/editorial/store.jpg"
              alt="The Gentleman Store craftsmanship"
              fill
              className="object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.2em] text-brand mb-4">
              Our Story
            </p>
            <h2 className="font-display text-3xl sm:text-4xl tracking-wide">
              A Commitment to
              <br />
              Dressing Well
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              The Gentleman Store was born from a simple belief: every man
              deserves access to well-crafted, thoughtfully designed clothing
              that reflects his taste and ambition.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Based in Bhopal, Madhya Pradesh, we curate collections that
              span from traditional Indian wear to contemporary Western
              formalwear. Every piece is selected for quality, fit, and
              lasting style.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our team of stylists understands that dressing well is personal.
              We are here to help you find pieces that feel authentically you.
            </p>
          </div>
        </div>

        <Separator className="mb-20" />

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "Quality First",
              description:
                "Every garment is crafted from premium fabrics and finished with attention to detail.",
            },
            {
              title: "Personal Service",
              description:
                "Our stylists provide one-on-one consultations to help you find the perfect fit.",
            },
            {
              title: "Timeless Style",
              description:
                "We focus on pieces that transcend seasons and trends.",
            },
          ].map((value) => (
            <div key={value.title} className="text-center">
              <h3 className="font-display text-xl tracking-wide mb-3">
                {value.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        <Separator className="mb-20" />

        {/* Store Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-2xl tracking-wide mb-6">
              Visit Our Store
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">
                    {siteConfig.location.address}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">
                    {siteConfig.location.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Hours</p>
                  <p className="text-sm text-muted-foreground">
                    Mon–Fri: {siteConfig.hours.weekdays}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Sat–Sun: {siteConfig.hours.weekends}
                  </p>
                </div>
              </div>
            </div>
            <Button asChild variant="brand" className="mt-8">
              <Link href="/book-appointment">
                Book an Appointment
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="aspect-video bg-secondary rounded-lg overflow-hidden">
            <Image
              src="/images/editorial/store.jpg"
              alt="The Gentleman Store - premium menswear store"
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
