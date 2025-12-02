
"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppBottomNav } from "@/components/mobileapp/AppBottomNav";
import { AppHeader } from "@/components/mobileapp/AppHeader";
import { Loader2, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";


export default function MobileAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isGuest, isLoading } = useApp();
  const router = useRouter();
  const pathname = usePathname();
  const isChatPage = pathname === "/mobileapp/chat";

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

  const PageContent = isChatPage ? React.cloneElement(children as React.ReactElement) : children;

  return (
    <div className="bg-black min-h-screen text-white">
      <AppHeader onSettingsClick={(children as any).props.openSettings} />
      <main className="pb-20 pt-16">
          <div className="p-4">{PageContent}</div>
      </main>
      <AppBottomNav />
    </div>
  );
}
