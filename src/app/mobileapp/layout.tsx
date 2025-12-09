
"use client";

import React, { useRef } from "react";
import { useApp } from "@/context/AppContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppBottomNav } from "@/components/mobileapp/AppBottomNav";
import { AppHeader } from "@/components/mobileapp/AppHeader";
import { Loader2 } from "lucide-react";
import type { ChatPageHandles } from './chat/page';

export default function MobileAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isGuest, isLoading } = useApp();
  const router = useRouter();
  const pathname = usePathname();
  const chatPageRef = useRef<ChatPageHandles>(null);

  useEffect(() => {
    if (!isLoading && !user && !isGuest && pathname !== "/mobileapp/login") {
      router.replace("/mobileapp/login");
    }
  }, [user, isGuest, isLoading, router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-yellow-400 animate-spin" />
      </div>
    );
  }

  if (pathname === '/mobileapp/login') {
      return <div className="bg-black min-h-screen">{children}</div>;
  }
  
  if (!user && !isGuest) {
    return null; 
  }

  // Clone the children to pass the ref if it's the chat page
  const pageContent = React.isValidElement(children) 
    ? React.cloneElement(children, { ref: chatPageRef } as any)
    : children;

  const handleSettingsClick = () => {
      if (chatPageRef.current) {
          chatPageRef.current.openSettings();
      }
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <AppHeader onSettingsClick={handleSettingsClick} />
      <main className="pb-20 pt-16">
          <div className="p-4">{pageContent}</div>
      </main>
      <AppBottomNav />
    </div>
  );
}
