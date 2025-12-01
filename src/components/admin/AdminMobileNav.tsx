
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Mic, Ticket, Music, QrCode, ShoppingCart, Menu, Newspaper } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const adminNavLinks = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/sales", label: "Ventas", icon: ShoppingCart },
  { href: "/admin/physical-tickets", label: "Boletos Físicos", icon: Newspaper },
  { href: "/admin/lineup", label: "Lineup", icon: Mic },
  { href: "/admin/tickets-types", label: "Tipos de Entradas", icon: Ticket },
  { href: "/scan", label: "Validar Entradas", icon: QrCode },
];

export function AdminMobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 md:hidden">
      <Link href="/admin" className="flex items-center gap-2 font-bold text-lg">
        <Music className="h-6 w-6 text-primary" />
        <span>JK Admin</span>
      </Link>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Abrir menú</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/admin"
              className="flex items-center gap-2 text-lg font-semibold mb-4"
              onClick={() => setIsOpen(false)}
            >
              <Music className="h-6 w-6 text-primary" />
              <span >JK Admin</span>
            </Link>
            {adminNavLinks.map((link) => (
              <SheetClose asChild key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-4 rounded-lg px-3 py-2 transition-all ${
                    pathname.startsWith(link.href) && (link.href !== '/admin' || pathname === '/admin')
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </Link>
              </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}

    