"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Mic, Ticket, Music, QrCode, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const adminNavLinks = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/lineup", label: "Lineup", icon: Mic },
  { href: "/admin/tickets-types", label: "Tipos de Entradas", icon: Ticket },
  { href: "/scan", label: "Validar Entradas", icon: QrCode },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  return (
    <aside className="w-64 flex-shrink-0 border-r bg-background flex-col hidden md:flex">
      <div className="h-16 border-b flex items-center px-6">
        <Link href="/admin" className="flex items-center gap-2 font-bold text-lg font-headline">
          <Music className="h-6 w-6 text-primary" />
          <span>JK Admin</span>
        </Link>
      </div>
      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-2">
          {adminNavLinks.map((link) => (
            <li key={link.href}>
              <Button
                asChild
                variant={pathname === link.href ? "secondary" : "ghost"}
                className="w-full justify-start transition-transform hover:translate-x-1"
              >
                <Link href={link.href}>
                  <link.icon className="mr-2 h-4 w-4" />
                  {link.label}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto p-4 border-t">
        <div className="text-xs text-muted-foreground p-2">
            <p className="font-semibold">Conectado como:</p>
            <p className="truncate">{user?.email}</p>
        </div>
        <Button variant="outline" className="w-full transition-colors hover:border-primary mt-2">
            <Link href="/">Volver a la web</Link>
        </Button>
         <Button variant="ghost" className="w-full justify-start text-muted-foreground mt-2" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar sesión
        </Button>
      </div>
    </aside>
  );
}
