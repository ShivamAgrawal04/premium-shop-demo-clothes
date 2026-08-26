import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { offers } from "@/data/offers";
import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/shared/fade-in";
import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "Offers",
  description: "Special offers and promotions at The Gentleman Store.",
  path: "/offers",
});

export default function OffersPage() {
  return (
    <>
      <PageHeader
        title="Special Offers"
        description="Curated offers for the discerning gentleman."
      />
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {offers.map((offer, index) => (
            <FadeIn key={offer.id} delay={index * 0.1}>
              <div className="border rounded-lg p-6 sm:p-8 hover:shadow-md transition-shadow h-full">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/10">
                    <Tag className="h-5 w-5 text-brand" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl tracking-wide">
                      {offer.title}
                    </h3>
                    <p className="mt-1 text-lg font-semibold text-brand">
                      {offer.discount}
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {offer.description}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      {offer.code && (
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-3 py-1 text-xs font-mono">
                          Code: {offer.code}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        Valid until {offer.validUntil}
                      </span>
                    </div>
                    {offer.collection && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="mt-4"
                      >
                        <Link href={`/collections/${offer.collection}`}>
                          View Collection
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <p className="mt-12 text-center text-xs text-muted-foreground/60">
          All offers are for demonstration purposes only. Not redeemable.
        </p>
      </div>
    </>
  );
}
