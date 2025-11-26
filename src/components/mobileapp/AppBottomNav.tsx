
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Ticket, PlusSquare, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/mobileapp", label: "Home", icon: Home },
  { href: "/mobileapp/tickets", label: "Boletos", icon: Ticket },
  { href: "/mobileapp/add", label: "Añadir", icon: PlusSquare },
  { href: "/mobileapp/chat", label: "Chat", icon: MessageCircle },
  { href: "/mobileapp/profile", label: "Cuenta", icon: User },
];

export function AppBottomNav() {
  const pathname = usePathname();

  return (
    <nav 
        className="fixed bottom-0 left-0 right-0 h-16 flex justify-around items-center z-50"
        style={{
            backgroundColor: '#121212',
            borderTop: '1px solid rgb(45, 45, 45)'
        }}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center justify-center gap-1 text-gray-400 w-1/5"
          >
            <item.icon
              className={cn(
                "h-6 w-6 transition-colors duration-200",
                isActive ? "text-yellow-400" : "text-gray-500"
              )}
            />
            <span
              className={cn(
                "text-xs font-medium transition-colors duration-200",
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
