
"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";
import { Toaster } from "@/components/ui/toaster";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isScanPage = pathname === "/scan";

  return (
    <div className={`admin-panel flex min-h-screen ${isScanPage ? 'bg-background' : 'bg-muted/40'}`}>
      {!isScanPage && (
        <>
          <AdminSidebar />
          <AdminMobileNav />
        </>
      )}
      <main className="flex-1 overflow-auto pt-16 md:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
      <Toaster />
    </div>
  );
}
