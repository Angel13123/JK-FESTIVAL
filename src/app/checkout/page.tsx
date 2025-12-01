
"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ticketTypes } from "@/lib/data";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { PaymentForm } from "@/components/checkout/PaymentForm";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  fullName: z.string()
    .min(3, "El nombre debe tener al menos 3 caracteres.")
    .regex(/[a-zA-Z]/, "Por favor, ingresa un nombre válido."),
  email: z.string().email("Por favor, introduce un email válido."),
  country: z.string().min(2, "El país es obligatorio."),
  city: z.string().optional(),
});

export default function CheckoutPage() {
  const { cartItems, getCartTotal } = useCart();
  const [customerInfo, setCustomerInfo] = useState<z.infer<typeof formSchema> | null>(null);
  const total = getCartTotal(ticketTypes);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      country: "",
      city: "",
    },
    mode: "onChange",
  });
  
  const handleCustomerInfoSubmit = (values: z.infer<typeof formSchema>) => {
      setCustomerInfo(values);
  }

  if (cartItems.length === 0) {
     return (
      <div className="container mx-auto max-w-screen-md px-4 py-16 text-center animate-fade-in-down">
        <h1 className="text-3xl">Tu carrito está vacío</h1>
        <p className="mt-4 text-muted-foreground">Parece que no has añadido ninguna entrada. Vuelve a la página de entradas para empezar.</p>
        <Button asChild className="mt-8 transition-transform duration-300 hover:scale-105">
          <Link href="/tickets">Ver entradas</Link>
        </Button>
      </div>
     )
  }

  return (
    <div className="bg-transparent">
      <div className="container mx-auto max-w-screen-lg px-4 py-16">
        <div className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl tracking-tight">Finalizar Compra</h1>
          <p className="mt-4 text-lg text-muted-foreground">Ya casi has terminado. Completa tus datos para recibir tus entradas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 animate-fade-in-up">
          <Card className="bg-card transition-shadow duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle>{customerInfo ? "Paso 2: Realiza el Pago" : "Paso 1: Tus Datos"}</CardTitle>
            </CardHeader>
            <CardContent>
              {!customerInfo ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleCustomerInfoSubmit)} className="space-y-6">
                    <FormField control={form.control} name="fullName" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre completo</FormLabel>
                          <FormControl><Input placeholder="Tu nombre y apellidos" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl><Input type="email" placeholder="tu@email.com" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                    )}/>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField control={form.control} name="country" render={({ field }) => (
                            <FormItem>
                              <FormLabel>País</FormLabel>
                              <FormControl><Input placeholder="Marruecos" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="city" render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ciudad (Opcional)</FormLabel>
                              <FormControl><Input placeholder="Tetuán" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                        )}/>
                    </div>
                    
                    <Button type="submit" className="w-full transition-transform duration-300 hover:scale-105" size="lg" disabled={!form.formState.isValid}>
                       Continuar al Pago
                    </Button>
                  </form>
                </Form>
              ) : (
                <div>
                    <PaymentForm cartItems={cartItems} customerInfo={customerInfo} />
                    <Button variant="link" onClick={() => setCustomerInfo(null)} className="w-full mt-4">
                      Editar información
                    </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card transition-shadow duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle>Resumen del pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map(item => {
                  const ticket = ticketTypes.find(t => t.id === item.ticketTypeId);
                  if (!ticket) return null;
                  return (
                    <div key={item.ticketTypeId} className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{ticket.name}</p>
                        <p className="text-sm text-muted-foreground">x {item.quantity}</p>
                      </div>
                      <p className="font-semibold">{(ticket.price * item.quantity).toFixed(2)} EUR</p>
                    </div>
                  )
                })}
                <hr className="my-4 border-dashed" />
                <div className="flex justify-between items-center text-xl font-bold">
                  <p>Total</p>
                  <p>{total.toFixed(2)} EUR</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
