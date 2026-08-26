import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { siteConfig } from "@/config/site";
import { whatsappGeneralInquiry } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "Size Guide",
  description: `Menswear size guide for suits, sherwanis and shirts at ${siteConfig.name}.`,
  path: "/size-guide",
});

const suitSizes = [
  { size: "S", chest: "36–37", waist: "30–31", shoulder: "16.5" },
  { size: "M", chest: "38–39", waist: "32–33", shoulder: "17.5" },
  { size: "L", chest: "40–41", waist: "34–35", shoulder: "18.5" },
  { size: "XL", chest: "42–43", waist: "36–37", shoulder: "19.5" },
  { size: "XXL", chest: "44–45", waist: "38–40", shoulder: "20.5" },
];

const shirtSizes = [
  { size: "S", neck: "14.5–15", chest: "36–38" },
  { size: "M", neck: "15–15.5", chest: "38–40" },
  { size: "L", neck: "16–16.5", chest: "40–42" },
  { size: "XL", neck: "17–17.5", chest: "42–44" },
  { size: "XXL", neck: "18–18.5", chest: "44–46" },
];

export default function SizeGuidePage() {
  return (
    <>
      <PageHeader
        title="Size Guide"
        description="Temporary demo size chart for suits, sherwanis and shirts. Visit the store for a perfect fit."
      />
      <div className="px-6 pb-20 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <p className="mb-10 max-w-2xl text-sm text-muted-foreground">
          Measurements are in inches. For wedding and made-to-order pieces, we
          recommend a store visit or WhatsApp enquiry so our stylists can guide
          you.
        </p>

        <section className="mb-14">
          <h2 className="font-display mb-4 text-2xl tracking-wide">
            Suits & Blazers
          </h2>
          <div className="overflow-x-auto border border-border">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="bg-secondary/70 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Size</th>
                  <th className="px-4 py-3 font-medium">Chest</th>
                  <th className="px-4 py-3 font-medium">Waist</th>
                  <th className="px-4 py-3 font-medium">Shoulder</th>
                </tr>
              </thead>
              <tbody>
                {suitSizes.map((row) => (
                  <tr key={row.size} className="border-t border-border">
                    <td className="px-4 py-3 font-medium">{row.size}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.chest}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.waist}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.shoulder}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="font-display mb-4 text-2xl tracking-wide">
            Shirts & Kurtas
          </h2>
          <div className="overflow-x-auto border border-border">
            <table className="w-full min-w-[400px] text-left text-sm">
              <thead className="bg-secondary/70 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Size</th>
                  <th className="px-4 py-3 font-medium">Neck</th>
                  <th className="px-4 py-3 font-medium">Chest</th>
                </tr>
              </thead>
              <tbody>
                {shirtSizes.map((row) => (
                  <tr key={row.size} className="border-t border-border">
                    <td className="px-4 py-3 font-medium">{row.size}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.neck}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.chest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="border border-border bg-secondary/40 p-6 sm:p-8">
          <h3 className="font-display text-xl tracking-wide">
            Need a fitting?
          </h3>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Message us on WhatsApp or book a store visit at{" "}
            {siteConfig.location.address}.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="brand">
              <a
                href={whatsappGeneralInquiry()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Ask on WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link href="/book-appointment">
                Book Appointment
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
