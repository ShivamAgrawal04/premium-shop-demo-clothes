import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center px-4">
        <p className="font-display text-8xl text-muted-foreground/20 mb-4">404</p>
        <h1 className="font-display text-3xl tracking-wide mb-3">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button asChild variant="brand">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
