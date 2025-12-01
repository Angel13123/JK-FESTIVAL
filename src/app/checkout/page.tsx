
"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { ticketTypes } from "@/lib/data";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createOrderAndTickets } from "@/lib/orders-service";


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

const CheckoutFormWrapper = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const total = getCartTotal(ticketTypes);
    const router = useRouter();
    const { toast } = useToast();
    const [clientSecret, setClientSecret] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const stripe = useStripe();
    const elements = useElements();

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
        if (isFormValid && cartItems.length > 0) {
          fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              cartItems, 
              customerInfo: watchedCustomerInfo
            }),
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


    const handleStripeSubmit = async (customerData: CustomerInfo) => {
        if (!stripe || !elements) return;

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });

        if (error) {
            setMessage(error.message || "An unexpected error occurred.");
            toast({
                variant: "destructive",
                title: "Error en el pago",
                description: error.message || "An unexpected error occurred.",
            });
            setIsLoading(false);
            router.push('/payment/failure');
            return;
        }

        if (paymentIntent && paymentIntent.status === "succeeded") {
            try {
                const newOrder = await createOrderAndTickets({
                    customerName: customerData.fullName,
                    customerEmail: customerData.email,
                    customerCountry: customerData.country,
                    totalAmount: total,
                    cartItems: cartItems,
                });

                toast({
                    title: "¡Compra completada!",
                    description: `Tu pedido se ha procesado con éxito.`,
                });

                clearCart();
                router.push(`/payment/success?orderId=${newOrder.id}&provider=stripe&tid=${paymentIntent.id}`);
            } catch (e: any) {
                console.error("Failed to create order after payment:", e);
                toast({
                    variant: "destructive",
                    title: "Error post-pago",
                    description: "Tu pago fue exitoso, pero hubo un error al crear tu pedido. Por favor, contacta a soporte.",
                });
                 setIsLoading(false);
            }
        } else {
            setMessage("El pago no se completó. Estado: " + paymentIntent?.status);
            setIsLoading(false);
            router.push('/payment/failure');
        }
    };
    
    const paymentElementOptions = {
        layout: "tabs" as const,
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleStripeSubmit)} className="space-y-6">
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
                    <>
                        <PaymentElement id="payment-element" options={paymentElementOptions} />
                        <Button
                            type="submit"
                            disabled={isLoading || !stripe || !elements || !isFormValid}
                            className="w-full"
                            size="lg"
                        >
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Pagar {total.toFixed(2)} EUR
                        </Button>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-24 text-center">
                        <Loader2 className="h-8 w-8 animate-spin mb-4" />
                        <p className="text-muted-foreground">
                            Completa tus datos para continuar...
                        </p>
                    </div>
                )}
                {message && <div id="payment-message" className="text-destructive text-sm">{message}</div>}
            </form>
        </Form>
    );
};


export default function CheckoutPage() {
  const { cartItems, getCartTotal } = useCart();
  const total = getCartTotal(ticketTypes);

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
    // clientSecret is set within the form now
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
                <Elements stripe={stripePromise} options={stripeOptions}>
                    <CheckoutFormWrapper />
                </Elements>
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
