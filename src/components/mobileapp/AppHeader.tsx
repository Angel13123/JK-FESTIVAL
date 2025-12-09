
"use client";

import { useApp } from "@/context/AppContext";
import { Music, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export function AppHeader({ onSettingsClick }: { onSettingsClick?: () => void }) {
  const { user, isGuest } = useApp();
  const pathname = usePathname();
  const isChatPage = pathname === "/mobileapp/chat";

  const getHeaderText = () => {
      if(isGuest) return "Modo Invitado";
      if(user) return `JK Festival`;
      return "Bienvenido";
  }

  return (
    <header 
        className="fixed top-0 left-0 right-0 h-16 px-4 flex items-center justify-between z-40"
        style={{
             backgroundColor: 'rgba(18, 18, 18, 0.8)',
             backdropFilter: 'blur(10px)',
             borderBottom: '1px solid rgb(45, 45, 45)'
        }}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center">
          <Music className="h-5 w-5 text-black" />
        </div>
        <div>
          <p className="text-lg font-bold text-white leading-tight">{getHeaderText()}</p>
        </div>
      </div>
      {isChatPage && onSettingsClick && (
          <Button variant="ghost" size="icon" onClick={onSettingsClick}>
              <Settings className="h-6 w-6 text-gray-400"/>
          </Button>
      )}
    </header>
  );
}
