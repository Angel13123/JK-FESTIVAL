import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from "lucide-radix";
import Link from "next/link";

export default function PaymentFailurePage() {
  return (
    <div className="container mx-auto max-w-screen-md px-4 py-16 flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-lg text-center shadow-lg">
        <CardHeader className="items-center">
          <div className="bg-red-100 p-3 rounded-full">
            <XCircle className="h-10 w-10 text-red-600" />
          </div>
          <CardTitle className="text-3xl font-headline mt-4">Error en el pago</CardTitle>
          <CardDescription className="text-base">Lo sentimos, no se ha podido procesar tu pago.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Ha ocurrido un problema al intentar completar tu compra. Por favor, comprueba tus datos de pago e inténtalo de nuevo.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/checkout">Volver a intentarlo</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
