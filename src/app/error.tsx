"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center px-4">
        <p className="font-display text-6xl text-muted-foreground/20 mb-4">!</p>
        <h1 className="font-display text-3xl tracking-wide mb-3">
          Something Went Wrong
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <Button onClick={reset} variant="brand">
          Try Again
        </Button>
      </div>
    </div>
  );
}
