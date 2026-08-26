import { Separator } from "@/components/ui/separator";

interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="pt-24 pb-10 lg:pt-28">
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <h1 className="font-display text-4xl tracking-wide sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-muted-foreground text-base sm:text-lg leading-relaxed">
            {description}
          </p>
        )}
        <Separator className="mt-8" />
      </div>
    </div>
  );
}
