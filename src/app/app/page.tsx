
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Music, Ticket, QrCode, LogOut } from "lucide-react";

export default function PwaHomePage() {
  return (
    <div className="flex flex-col h-full bg-background text-foreground p-4">
      {/* Header */}
      <header className="flex items-center justify-between py-2 border-b border-border/40">
        <div className="flex items-center gap-2 font-bold text-lg font-headline">
            <Music className="h-6 w-6 text-primary" />
            <span>JK Festival App</span>
        </div>
        <Button variant="ghost" size="icon" asChild>
            <Link href="/">
                <LogOut className="h-5 w-5"/>
                <span className="sr-only">Salir al sitio web</span>
            </Link>
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-10 flex items-center justify-center">
        <div className="text-center">
            <h1 className="text-4xl font-bold font-headline">Bienvenido a la App</h1>
            <p className="text-muted-foreground mt-2">Aquí tienes acceso rápido a las funciones más importantes.</p>
        </div>
      </main>
    </div>
  );
}
