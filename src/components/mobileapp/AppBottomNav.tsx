
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Ticket, PlusSquare, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/mobileapp", label: "Home", icon: Home },
  { href: "/mobileapp/tickets", label: "Mis Boletos", icon: Ticket },
  { href: "/mobileapp/add", label: "Añadir", icon: PlusSquare },
  { href: "/mobileapp/chat", label: "Chat", icon: MessageCircle },
  { href: "/mobileapp/profile", label: "Cuenta", icon: User },
];

export function AppBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-black border-t border-gray-800 flex justify-around items-center z-50">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center justify-center gap-1 text-gray-400"
          >
            <item.icon
              className={cn(
                "h-6 w-6 transition-colors",
                isActive ? "text-yellow-400" : "text-gray-500"
              )}
            />
            <span
              className={cn(
                "text-xs transition-colors",
                isActive ? "text-yellow-400" : "text-gray-500"
              )}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
