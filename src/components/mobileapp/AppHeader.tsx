
"use client";

import { useApp } from "@/context/AppContext";
import { User } from "lucide-react";

export function AppHeader() {
  const { user, isGuest } = useApp();

  const getHeaderText = () => {
      if(isGuest) return "Modo Invitado";
      if(user) return `Hola, ${user.username}`;
      return "Bienvenido";
  }

  return (
    <header 
        className="fixed top-0 left-0 right-0 h-16 px-4 flex items-center z-40"
        style={{
             backgroundColor: 'rgba(18, 18, 18, 0.8)',
             backdropFilter: 'blur(10px)',
             borderBottom: '1px solid rgb(45, 45, 45)'
        }}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center">
          <User className="h-5 w-5 text-black" />
        </div>
        <div>
          <p className="text-lg font-bold text-white leading-tight">{getHeaderText()}</p>
        </div>
      </div>
    </header>
  );
}
