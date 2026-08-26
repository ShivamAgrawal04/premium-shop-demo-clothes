import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  alignment = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 sm:mb-16",
        alignment === "center" && "text-center",
        className
      )}
    >
      <h2 className="font-display text-2xl tracking-wide sm:text-3xl lg:text-[2.5rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-xl text-muted-foreground text-sm sm:text-base mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
