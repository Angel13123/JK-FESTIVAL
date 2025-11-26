
"use client";

import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, logout } = useApp();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/mobileapp/login');
  };

  if (!user) {
    return null; // Or a loading state, though the layout should handle redirection
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <h1 className="text-3xl font-bold text-yellow-400 mb-8 text-center">Mi Cuenta</h1>
      
      <Card className="bg-gray-900 border-gray-800 text-white">
        <CardHeader>
          <CardTitle>Información del Usuario</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-gray-400">Nombre de Usuario</p>
            <p className="text-lg font-semibold">{user.username}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="text-lg font-semibold">{user.email}</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="pt-8">
        <Button onClick={handleLogout} variant="destructive" size="lg" className="w-full bg-red-600 text-white hover:bg-red-700">
          <LogOut className="mr-2 h-5 w-5" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
}
