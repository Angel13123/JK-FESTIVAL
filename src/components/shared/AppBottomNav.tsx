"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Ticket, QrCode, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/app", icon: Home, label: "Inicio" },
  { href: "/tickets", icon: Ticket, label: "Entradas" },
  { href: "/scan", icon: QrCode, label: "Escanear" },
  { href: "/admin", icon: User, label: "Admin" },
];

export function AppBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 left-0 right-0 h-20 bg-black border-t-2 border-primary z-50">
      <div className="grid h-full grid-cols-4 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 text-gray-400 transition-colors hover:text-white"
            >
              <item.icon className={cn("h-6 w-6", isActive ? "text-accent" : "")} />
              <span className={cn("text-xs font-medium", isActive ? "text-accent font-bold" : "")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
