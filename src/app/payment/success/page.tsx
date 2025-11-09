import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="container mx-auto max-w-screen-md px-4 py-16 flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-lg text-center shadow-lg">
        <CardHeader className="items-center">
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-headline mt-4">¡Pago completado con éxito!</CardTitle>
          <CardDescription className="text-base">Gracias por tu compra.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Hemos recibido tu pago. En breve recibirás un correo electrónico con tus entradas y todos los detalles de tu pedido.
          </p>
          <p className="text-xs text-muted-foreground mt-4">
             // TODO: En una implementación real, aquí se generaría un código QR único para cada entrada y se almacenaría en la base de datos.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild>
              <Link href="/">Volver al inicio</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/tickets">Comprar más entradas</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
