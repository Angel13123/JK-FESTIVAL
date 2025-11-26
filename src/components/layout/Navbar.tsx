
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Music, X, Home, Ticket, MapPin } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { PwaInstallButton } from "@/components/shared/PwaInstallButton";

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
        "text-md font-bold transition-colors hover:text-primary",
        pathname === href 
          ? "text-primary [-webkit-text-stroke:1px_black] [text-shadow:2px_2px_0px_#000000]" 
          : "text-black"
      )}
    >
      {label}
    </Link>
  );
  
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b-4 border-black bg-accent">
        <div className="container flex h-20 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Music className="h-10 w-10 text-black" />
            <span className="text-4xl font-headline text-primary" style={{ WebkitTextStroke: '2px black', textShadow: '4px 4px 0px #000000' }}>JK Festival</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <PwaInstallButton />
            </div>
            <Button asChild className="hidden sm:inline-flex" variant="secondary">
                <Link href="/tickets">Comprar</Link>
            </Button>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="secondary" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs pr-0 bg-accent border-r-4 border-black">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between border-b-4 border-black p-4 h-20">
                     <Link href="/" className="flex items-center gap-2">
                      <Music className="h-8 w-8 text-black" />
                      <span className="text-3xl font-headline text-primary" style={{ WebkitTextStroke: '2px black', textShadow: '3px 3px 0px #000000' }}>JK Festival</span>
                    </Link>
                  </div>
                  <nav className="flex flex-col gap-6 p-4">
                    {navLinks.map((link) => (
                      <NavLink key={link.href} {...link} />
                    ))}
                  </nav>
                  <div className="mt-auto p-4 border-t-4 border-black">
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
    </>
  );
}
