
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MobileAppHomePage() {

  return (
    <div className="animate-fade-in-up">
        <h1 className="text-3xl font-bold text-yellow-400 mb-8 text-center">Home</h1>
        <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
                <CardTitle className="text-white">¡Bienvenido!</CardTitle>
                <CardDescription>Las actualizaciones del festival aparecerán aquí próximamente.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-gray-400">Mantente atento a las noticias, horarios y sorpresas que publicaremos aquí. ¡La mejor experiencia del festival está en tu bolsillo!</p>
            </CardContent>
        </Card>
    </div>
  );
}
