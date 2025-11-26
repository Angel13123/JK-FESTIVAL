
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="animate-fade-in-up h-[70vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-yellow-400 mb-8 text-center">Chat de la Comunidad</h1>
        <Card className="bg-gray-900 border-gray-800 w-full max-w-md text-center">
            <CardHeader className="items-center">
                <MessageCircle className="h-12 w-12 text-yellow-400 mb-4"/>
                <CardTitle className="text-white">Próximamente</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-400">El chat de la comunidad estará disponible en breve. ¡Prepárate para conectar con otros asistentes al festival!</p>
            </CardContent>
        </Card>
    </div>
  );
}
