
"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { ticketTypes } from "@/lib/data";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { PaymentForm } from "@/components/checkout/PaymentForm";
import { Loader2 } from "lucide-react";

const customerInfoSchema = z.object({
  fullName: z.string()
    .min(3, "El nombre debe tener al menos 3 caracteres.")
    .regex(/[a-zA-Z]/, "Por favor, ingresa un nombre válido."),
  email: z.string().email("Por favor, introduce un email válido."),
  country: z.string().min(2, "El país es obligatorio."),
  city: z.string().optional(),
});

type CustomerInfo = z.infer<typeof customerInfoSchema>;

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const { cartItems, getCartTotal } = useCart();
  const [clientSecret, setClientSecret] = useState("");
  const total = getCartTotal(ticketTypes);

  const form = useForm<CustomerInfo>({
    resolver: zodResolver(customerInfoSchema),
    defaultValues: {
      fullName: "",
      email: "",
      country: "",
      city: "",
    },
    mode: "onChange",
  });
  
  const watchedCustomerInfo = useWatch({ control: form.control });
  const isFormValid = form.formState.isValid;

  useEffect(() => {
    // Only fetch the client secret if the form is valid and cart is not empty
    if (isFormValid && cartItems.length > 0) {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems, customerInfo: watchedCustomerInfo }),
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else if (data.error) {
          console.error("API Error:", data.error);
        }
      })
      .catch(error => {
        console.error("Fetch Error:", error);
      });
    }
  }, [isFormValid, cartItems, watchedCustomerInfo]);


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

  const appearance = {
    theme: 'stripe' as const,
    variables: {
        colorPrimary: '#F7FF00',
        colorBackground: '#ffffff',
        colorText: '#000000',
        colorDanger: '#df1b41',
        fontFamily: 'Montserrat, sans-serif',
        spacingUnit: '4px',
        borderRadius: '12px',
    },
     rules: {
        '.Input': {
            borderColor: '#000000',
            borderWidth: '1px',
        },
        '.Input:focus': {
            borderColor: '#F7FF00',
            boxShadow: '0 0 0 1px #F7FF00'
        },
        '.Tab': {
            borderColor: '#000000',
            borderWidth: '1px'
        },
        '.Tab:focus': {
            borderColor: '#F7FF00',
            boxShadow: '0 0 0 1px #F7FF00'
        },
        '.Tab--selected': {
            borderColor: '#F7FF00',
            backgroundColor: '#F7FF00'
        }
    }
  };
  const stripeOptions = {
    clientSecret,
    appearance,
  };


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
              <CardTitle>Tus Datos y Pago</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-6">
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
                  <hr className="my-4 border-dashed" />
                  {clientSecret ? (
                      <Elements options={stripeOptions} stripe={stripePromise}>
                        <PaymentForm 
                          cartItems={cartItems} 
                          customerInfo={watchedCustomerInfo as CustomerInfo} 
                        />
                      </Elements>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-48 text-center">
                        <Loader2 className="h-8 w-8 animate-spin mb-4" />
                        <p className="text-muted-foreground">
                          {isFormValid 
                            ? "Generando terminal de pago seguro..." 
                            : "Completa tus datos para continuar."
                          }
                        </p>
                      </div>
                    )}
                </form>
              </Form>
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
