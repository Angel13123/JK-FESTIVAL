
"use client";

import { useApp } from "@/context/AppContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppBottomNav } from "@/components/mobileapp/AppBottomNav";

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
        <p className="text-white">Loading...</p>
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
      <main className="pb-20">
          <div className="p-4">{children}</div>
      </main>
      <AppBottomNav />
    </div>
  );
}
