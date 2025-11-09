"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ticketTypes } from "@/lib/data";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, "El nombre completo es obligatorio."),
  email: z.string().email("Por favor, introduce un email válido."),
  country: z.string().optional(),
  city: z.string().optional(),
});

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const total = getCartTotal(ticketTypes);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      country: "",
      city: "",
    },
  });

  // TODO: Implement real payment logic here
  // This function would create a checkout session with a payment provider like Stripe
  // and then redirect the user to the Stripe Checkout page.
  const createMockCheckoutSession = async (values: z.infer<typeof formSchema>) => {
    console.log("Creating mock checkout session with data:", {
      ...values,
      cart: cartItems,
      total: total,
    });
    
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate a random success or failure
    const isSuccess = Math.random() > 0.2; // 80% success rate

    setIsLoading(false);
    
    if (isSuccess) {
      // On success, a real implementation would rely on a webhook from the payment provider
      // to confirm the order and send emails. Here we just clear the cart and redirect.
      clearCart();
      router.push('/payment/success');
    } else {
      router.push('/payment/failure');
    }
  };


  if (cartItems.length === 0 && !isLoading) {
     return (
      <div className="container mx-auto max-w-screen-md px-4 py-16 text-center">
        <h1 className="text-3xl font-bold font-headline">Tu carrito está vacío</h1>
        <p className="mt-4 text-muted-foreground">Parece que no has añadido ninguna entrada. Vuelve a la página de entradas para empezar.</p>
        <Button asChild className="mt-8">
          <a href="/tickets">Ver entradas</a>
        </Button>
      </div>
     )
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-screen-lg px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">Finalizar Compra</h1>
          <p className="mt-4 text-lg text-muted-foreground">Ya casi has terminado. Completa tus datos para recibir tus entradas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Tus datos</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(createMockCheckoutSession)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre completo</FormLabel>
                          <FormControl>
                            <Input placeholder="Tu nombre y apellidos" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="tu@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                       <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>País (Opcional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Marruecos" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ciudad (Opcional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Tetuán" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      {isLoading ? 'Procesando pago...' : `Pagar ahora ${total.toFixed(2)} EUR`}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                        // TODO: Al hacer clic, se redirigirá a una pasarela de pago como Stripe.
                    </p>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="bg-card">
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
                  <hr className="my-4" />
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
    </div>
  );
}
