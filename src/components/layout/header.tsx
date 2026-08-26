"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Menu, MessageCircle, Sun, Moon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { navigation } from "@/config/navigation";
import { whatsappGeneralInquiry } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { products } from "@/data/products";

function useTheme() {
  const [theme, setThemeState] = React.useState<"light" | "dark">("light");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const detected =
      stored ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    React.startTransition(() => {
      setThemeState(detected);
      setMounted(true);
    });
    document.documentElement.classList.toggle("dark", detected === "dark");
  }, []);

  const toggle = React.useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  }, []);

  return { theme, toggle, mounted };
}

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const { theme, toggle, mounted } = useTheme();
  const searchResults = query.trim()
    ? products
        .filter((product) =>
          [product.name, product.category, product.collection, product.material]
            .join(" ")
            .toLowerCase()
            .includes(query.trim().toLowerCase())
        )
        .slice(0, 5)
    : products.slice(0, 4);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-background"
      )}
    >
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <div className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-3 lg:flex lg:h-20 lg:justify-between">
          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px]">
              <SheetHeader>
                <SheetTitle className="text-left font-display text-xl tracking-wider">
                  MENU
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col">
                {navigation.main.map((item, i) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-sm uppercase tracking-[0.2em] text-foreground/70 hover:text-foreground transition-colors border-b border-border/40"
                  >
                    <span className="text-xs text-muted-foreground mr-3 font-mono">
                      0{i + 1}
                    </span>
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 space-y-3">
                <Button asChild variant="brand" className="w-full">
                  <a
                    href={whatsappGeneralInquiry()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Us
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/book-appointment" onClick={() => setOpen(false)}>
                    Book Appointment
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex min-w-0 items-center justify-self-center gap-2 lg:justify-self-auto lg:gap-3">
            <span className="truncate font-display text-[13px] uppercase tracking-[0.18em] text-foreground sm:text-lg sm:tracking-[0.25em] lg:text-xl">
              The Gentleman
            </span>
            <span className="hidden sm:inline-block w-px h-5 bg-border" />
            <span className="hidden sm:block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Store
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navigation.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggle}
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                {theme === "dark" ? (
                  <Sun className="h-[18px] w-[18px]" />
                ) : (
                  <Moon className="h-[18px] w-[18px]" />
                )}
              </Button>
            )}
            <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Search products"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-[18px] w-[18px]" />
              </Button>
              <DialogContent className="top-[12%] translate-y-0 sm:top-[18%] sm:max-w-xl">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl tracking-wide">
                    Find your next piece
                  </DialogTitle>
                  <DialogDescription>
                    Search by style, collection, or material.
                  </DialogDescription>
                </DialogHeader>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    autoFocus
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Try ‘sherwani’ or ‘silk’"
                    className="h-12 w-full border border-input bg-background pl-10 pr-4 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <div className="-mx-2 max-h-[52vh] overflow-y-auto">
                  {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="group flex items-center justify-between gap-4 px-2 py-3 hover:bg-secondary"
                      >
                        <span>
                          <span className="block text-sm font-medium">{product.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {product.category} / {product.material}
                          </span>
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-brand" />
                      </Link>
                    ))
                  ) : (
                    <p className="px-2 py-6 text-center text-sm text-muted-foreground">
                      No pieces match that search.
                    </p>
                  )}
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
              asChild
            >
              <a
                href={whatsappGeneralInquiry()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-[18px] w-[18px]" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
