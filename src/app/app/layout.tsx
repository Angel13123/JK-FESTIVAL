"use client";

import { usePathname } from "next/navigation";
import { AppBottomNav } from "@/components/shared/AppBottomNav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const noNavRoutes = ['/scan']; // Example if scan page needs full screen

  return (
    <div className="flex flex-col h-screen bg-background">
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
      {!noNavRoutes.includes(pathname) && <AppBottomNav />}
    </div>
  );
}
