
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
  const { user, isLoading } = useApp();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If not loading and no user, and not on the login page, redirect to login
    if (!isLoading && !user && pathname !== "/mobileapp/login") {
      router.replace("/mobileapp/login");
    }
  }, [user, isLoading, router, pathname]);

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
  
  if (!user) {
    // This will be shown briefly before the redirect happens
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
