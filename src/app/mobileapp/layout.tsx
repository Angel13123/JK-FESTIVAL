
"use client";

import { useApp } from "@/context/AppContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppBottomNav } from "@/components/mobileapp/AppBottomNav";
import { AppHeader } from "@/components/mobileapp/AppHeader";
import { Loader2 } from "lucide-react";

export default function MobileAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isGuest, isLoading } = useApp();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If not loading, and not a user, and not a guest, and not on the login page, redirect to login
    if (!isLoading && !user && !isGuest && pathname !== "/mobileapp/login") {
      router.replace("/mobileapp/login");
    }
  }, [user, isGuest, isLoading, router, pathname]);

  if (isLoading) {
    // You can return a loading spinner here
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-yellow-400 animate-spin" />
      </div>
    );
  }

  // Allow login page to render without the layout
  if (pathname === '/mobileapp/login') {
      return <div className="bg-black min-h-screen">{children}</div>;
  }
  
  // If not logged in and not a guest, show nothing before redirect
  if (!user && !isGuest) {
    return null; 
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <AppHeader />
      <main className="pb-20 pt-16">
          <div className="p-4">{children}</div>
      </main>
      <AppBottomNav />
    </div>
  );
}
