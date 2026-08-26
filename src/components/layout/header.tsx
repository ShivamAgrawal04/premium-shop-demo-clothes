"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, Sun, Moon } from "lucide-react";
// import { X } from "lucide-react"; // used by archived demo-dashboard banner
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SearchDialog } from "@/components/shared/search-dialog";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { navigation } from "@/config/navigation";
import { whatsappGeneralInquiry } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

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
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  // Future: restore leads dashboard banner → see `src/archive/demo-dashboard-page.tsx`
  // const [showDemo, setShowDemo] = React.useState(false);
  const { theme, toggle, mounted } = useTheme();
  const overHero = isHome && !scrolled;

  // React.useEffect(() => {
  //   try {
  //     if (localStorage.getItem("tgs-demo-banner-hidden") !== "1") {
  //       setShowDemo(true);
  //     }
  //   } catch {
  //     setShowDemo(true);
  //   }
  // }, []);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // const dismissDemo = () => {
  //   setShowDemo(false);
  //   try {
  //     localStorage.setItem("tgs-demo-banner-hidden", "1");
  //   } catch {
  //     /* ignore */
  //   }
  // };

  return (
    <header
      className={cn(
        "z-50 transition-all duration-300",
        isHome ? "fixed left-0 right-0 top-0" : "sticky top-0",
        overHero
          ? "border-transparent bg-gradient-to-b from-black/70 via-black/25 to-transparent"
          : "border-b border-border/60 bg-background/92 backdrop-blur-xl"
      )}
    >
      {/* Future leads dashboard banner (route archived → src/archive/demo-dashboard-page.tsx)
      {showDemo && (
        <div
          className={cn(
            "relative border-b px-10 py-1.5 text-center sm:px-12",
            overHero
              ? "border-white/10 bg-black/50 text-white"
              : "border-brand/20 bg-brand-surface text-foreground"
          )}
        >
          <p className="text-[10px] uppercase tracking-[0.16em] sm:text-[11px]">
            Shop-owner demo ·{" "}
            <Link
              href="/demo-dashboard"
              className={cn(
                "underline-offset-2 hover:underline",
                overHero ? "text-[#C4A35A]" : "text-brand"
              )}
            >
              open leads dashboard
            </Link>
          </p>
          <button
            type="button"
            aria-label="Dismiss demo banner"
            onClick={dismissDemo}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 rounded p-1",
              overHero
                ? "text-white/50 hover:text-white"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
      */}

      <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <div className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-3 lg:flex lg:h-[4.5rem] lg:justify-between">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "lg:hidden",
                  overHero && "text-white hover:bg-white/10 hover:text-white"
                )}
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
                    className="block border-b border-border/40 py-3 text-sm uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-foreground"
                  >
                    <span className="mr-3 font-mono text-xs text-muted-foreground">
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
                    <WhatsAppIcon className="h-4 w-4" />
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

          <Link
            href="/"
            className="flex min-w-0 items-center justify-self-center gap-2 lg:justify-self-auto lg:gap-3"
          >
            <span
              className={cn(
                "truncate font-display text-[13px] uppercase tracking-[0.18em] sm:text-lg sm:tracking-[0.25em] lg:text-xl",
                overHero ? "text-white" : "text-foreground"
              )}
            >
              The Gentleman
            </span>
            <span
              className={cn(
                "hidden h-5 w-px sm:inline-block",
                overHero ? "bg-white/35" : "bg-border"
              )}
            />
            <span
              className={cn(
                "hidden text-[10px] uppercase tracking-[0.3em] sm:block",
                overHero ? "text-white/60" : "text-muted-foreground"
              )}
            >
              Store
            </span>
          </Link>

          <nav className="hidden items-center gap-10 lg:flex">
            {navigation.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[11px] uppercase tracking-[0.2em] transition-colors duration-200",
                  overHero
                    ? "text-white/75 hover:text-white"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggle}
                className={cn(
                  overHero && "text-white hover:bg-white/10 hover:text-white"
                )}
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                {theme === "dark" ? (
                  <Sun className="h-[18px] w-[18px]" />
                ) : (
                  <Moon className="h-[18px] w-[18px]" />
                )}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search products"
              onClick={() => setSearchOpen(true)}
              className={cn(
                overHero && "text-white hover:bg-white/10 hover:text-white"
              )}
            >
              <Search className="h-[18px] w-[18px]" />
            </Button>
            <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "hidden sm:inline-flex",
                overHero
                  ? "text-[#4ADE80] hover:bg-white/10"
                  : "text-[#25D366]"
              )}
              asChild
            >
              <a
                href={whatsappGeneralInquiry()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-[18px] w-[18px]" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
