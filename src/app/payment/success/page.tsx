"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Ticket } from "lucide-react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  // For this specific test, we know the code is fixed.
  const testTicketCode = 'An93lPru3b4';

  return (
     <div className="container mx-auto max-w-screen-md px-4 py-16 flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-lg text-center shadow-lg animate-fade-in-down">
            <CardHeader className="items-center">
                <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <CardTitle className="text-3xl font-headline mt-4">¡Pago completado con éxito!</CardTitle>
                <CardDescription className="text-base">Gracias por tu compra.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Hemos recibido tu pago y tus entradas han sido generadas. Recibirás un correo electrónico con todos los detalles.
                </p>
                <div className="mt-6 bg-muted p-4 rounded-lg border border-dashed">
                    <h3 className="font-bold text-lg">Tu código de prueba de entrada es:</h3>
                    <div className="flex items-center justify-center gap-2 mt-2">
                        <Ticket className="h-5 w-5 text-primary"/>
                        <p className="font-mono text-2xl font-bold tracking-widest text-primary">
                            {testTicketCode}
                        </p>
                    </div>
                     <p className="text-xs text-muted-foreground mt-2">
                       Este es un código de prueba. Cada una de tus entradas tiene un código único.
                    </p>
                </div>
                <div className="mt-8 flex justify-center gap-4">
                    <Button asChild>
                        <Link href="/">Volver al inicio</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/admin">Ir al panel de admin</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <SuccessContent />
        </Suspense>
    )
}
