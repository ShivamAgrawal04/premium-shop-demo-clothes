import { ExternalLink, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface StoreMapProps {
  className?: string;
  showActions?: boolean;
}

/** Embedded Google Map for the shop — opens full Maps in a new tab */
export function StoreMap({ className, showActions = true }: StoreMapProps) {
  return (
    <div className={cn("flex h-full flex-col overflow-hidden bg-secondary", className)}>
      <div className="relative min-h-[280px] flex-1 lg:min-h-[360px]">
        <iframe
          title={`${siteConfig.name} location map — Katra Mohalla, Hanuman Bazariya, Bhind`}
          src={siteConfig.location.mapsEmbedUrl}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      {showActions && (
        <div className="flex flex-col gap-3 border-t border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            <span>{siteConfig.location.address}</span>
          </div>
          <Button asChild variant="outline" size="sm">
            <a
              href={siteConfig.location.mapsOpenUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}
