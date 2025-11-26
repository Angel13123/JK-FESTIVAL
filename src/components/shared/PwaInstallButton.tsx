"use client";

import { useState, useEffect } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Download } from "lucide-react";

// This interface is needed to extend the Window object with our prompt property.
declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function PwaInstallButton({ children, ...props }: ButtonProps) {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
      // Prevent the mini-infobar from appearing on mobile
      event.preventDefault();
      // Stash the event so it can be triggered later.
      setInstallPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) {
      return;
    }
    // Show the install prompt
    await installPrompt.prompt();
    // Wait for the user to respond to the prompt
    await installPrompt.userChoice;
    // We can only use the prompt once, so clear it.
    setInstallPrompt(null);
  };

  if (!installPrompt) {
    return null;
  }

  return (
    <Button 
      onClick={handleInstallClick}
      {...props}
    >
      {children || (
        <>
          <Download className="mr-2 h-4 w-4" />
          Instalar App
        </>
      )}
    </Button>
  );
}
