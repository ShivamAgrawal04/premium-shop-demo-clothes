import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { collections } from "@/data/collections";
import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/shared/fade-in";
import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "Collections",
  description:
    "Browse our curated collections of premium menswear for every occasion.",
  path: "/collections",
});

export default function CollectionsPage() {
  return (
    <>
      <PageHeader
        title="Our Collections"
        description="Curated collections for every occasion and style."
      />
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {collections.map((collection, index) => (
            <FadeIn key={collection.id} delay={index * 0.1}>
              <Link
                href={`/collections/${collection.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-2xl text-white tracking-wide">
                      {collection.name}
                    </h3>
                    <p className="mt-1 text-sm text-white/70">
                      {collection.tagline}
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-xs uppercase tracking-widest text-white/90 group-hover:text-brand transition-colors">
                      Explore Collection
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </>
  );
}
