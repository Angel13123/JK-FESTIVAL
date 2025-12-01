
"use client";

import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LogOut, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, logout, isGuest, exitGuestMode } = useApp();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/mobileapp/login');
  };

  const handleLoginRedirect = () => {
      exitGuestMode();
      router.push('/mobileapp/login');
  }

  if (isGuest) {
      return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center animate-fade-in-up">
            <Card className="bg-gray-900 border-gray-800 w-full max-w-md text-center">
                <CardHeader className="items-center">
                    <LogIn className="h-12 w-12 text-yellow-400 mb-4"/>
                    <CardTitle className="text-white">Estás en modo invitado</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-gray-400">Inicia sesión o regístrate para acceder a tus boletos y funciones exclusivas.</p>
                    <Button onClick={handleLoginRedirect} className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
                        <LogIn className="mr-2 h-5 w-5"/>
                        Iniciar Sesión / Registrarse
                    </Button>
                </CardContent>
            </Card>
        </div>
      )
  }

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
