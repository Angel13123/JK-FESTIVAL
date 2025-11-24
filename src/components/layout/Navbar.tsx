"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Music, X, Home, Ticket, MapPin } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/lineup", label: "Lineup" },
  { href: "/tickets", label: "Entradas" },
  { href: "/info", label: "Info" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contacto" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      onClick={() => setIsMobileMenuOpen(false)}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        pathname === href ? "text-primary" : "text-foreground/80"
      )}
    >
      {label}
    </Link>
  );
  
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hidden md:block">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg font-headline">
            <Music className="h-6 w-6 text-primary" />
            <span>JK Festival</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild className="hidden sm:inline-flex">
                <Link href="/tickets">Comprar entradas</Link>
              </Button>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs pr-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between border-b p-4">
                    <Link href="/" className="flex items-center gap-2 font-bold text-lg font-headline">
                      <Music className="h-6 w-6 text-primary" />
                      <span>JK Festival</span>
                    </Link>
                  </div>
                  <nav className="flex flex-col gap-6 p-4">
                    {navLinks.map((link) => (
                      <NavLink key={link.href} {...link} />
                    ))}
                  </nav>
                  <div className="mt-auto p-4 border-t">
                    <Button asChild className="w-full">
                      <Link href="/tickets">Comprar entradas</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/80 backdrop-blur-lg border-t border-primary/20">
          <div className="grid h-16 grid-cols-4 w-full">
              <Link href="/" className={cn("flex flex-col items-center justify-center gap-1 transition-colors", pathname === '/' ? 'text-primary' : 'text-muted-foreground hover:text-primary')}>
                  <Home className="h-5 w-5" />
                  <span className="text-xs">Inicio</span>
              </Link>
              <Link href="/lineup" className={cn("flex flex-col items-center justify-center gap-1 transition-colors", pathname === '/lineup' ? 'text-primary' : 'text-muted-foreground hover:text-primary')}>
                  <Music className="h-5 w-5" />
                  <span className="text-xs">Lineup</span>
              </Link>
              <Link href="/tickets" className={cn("flex flex-col items-center justify-center gap-1 transition-colors", pathname === '/tickets' ? 'text-primary' : 'text-muted-foreground hover:text-primary')}>
                  <Ticket className="h-5 w-5" />
                  <span className="text-xs">Entradas</span>
              </Link>
              <Link href="/info" className={cn("flex flex-col items-center justify-center gap-1 transition-colors", pathname === '/info' ? 'text-primary' : 'text-muted-foreground hover:text-primary')}>
                  <MapPin className="h-5 w-5" />
                  <span className="text-xs">Info</span>
              </Link>
          </div>
      </nav>
    </>
  );
}
