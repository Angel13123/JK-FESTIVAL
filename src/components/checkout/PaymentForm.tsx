
"use client";

import { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  AddressElement,
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  PayPalScriptProvider,
  PayPalButtons,
  OnApproveData,
  CreateOrderData,
} from "@paypal/react-paypal-js";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { createOrderAndTickets } from "@/lib/orders-service";
import { useRouter } from "next/navigation";
import { ticketTypes } from "@/lib/data";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;

interface PaymentFormProps {
  cartItems: { ticketTypeId: string; quantity: number }[];
  customerInfo: {
    fullName: string;
    email: string;
    country: string;
    city?: string;
  };
}

function CheckoutForm({ cartItems, customerInfo }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const { clearCart, getCartTotal } = useCart();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const totalAmount = getCartTotal(ticketTypes);

  const handleStripeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required", // Prevent automatic redirection
    });

    if (error) {
      setMessage(error.message || "An unexpected error occurred.");
      toast({
        variant: "destructive",
        title: "Error en el pago",
        description: error.message || "An unexpected error occurred.",
      });
      setIsLoading(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      await handleSuccessfulPayment("stripe", paymentIntent.id);
    } else {
        // Handle other statuses like processing, requires_action, etc.
        setMessage("El pago no se completó. Estado: " + paymentIntent.status);
        setIsLoading(false);
    }
  };

  const handleSuccessfulPayment = async (provider: 'stripe' | 'paypal', transactionId: string) => {
    try {
      const newOrder = await createOrderAndTickets({
        customerName: customerInfo.fullName,
        customerEmail: customerInfo.email,
        customerCountry: customerInfo.country,
        totalAmount: totalAmount,
        cartItems: cartItems,
      });

      toast({
        title: "¡Compra completada!",
        description: `Tu pedido se ha procesado con ${provider}.`,
      });

      clearCart();
      router.push(`/payment/success?orderId=${newOrder.id}&provider=${provider}&tid=${transactionId}`);
    } catch (e: any) {
      console.error("Failed to create order after payment:", e);
      toast({
        variant: "destructive",
        title: "Error post-pago",
        description:
          "Tu pago fue exitoso, pero hubo un error al crear tu pedido. Por favor, contacta a soporte.",
      });
      // Don't redirect, so user can see the error
    } finally {
        setIsLoading(false);
    }
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
    fields: {
      billingDetails: {
        address: 'auto'
      }
    }
  };

  return (
    <div className="space-y-6">
      <form id="payment-form" onSubmit={handleStripeSubmit} className="space-y-4">
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <Button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="w-full"
          size="lg"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Pagar con Tarjeta
        </Button>
        {message && <div id="payment-message" className="text-destructive text-sm">{message}</div>}
      </form>

      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-muted"></div>
        <span className="flex-shrink mx-4 text-muted-foreground text-xs uppercase">O</span>
        <div className="flex-grow border-t border-muted"></div>
      </div>

      <PayPalButtons
        style={{ layout: "vertical", color: 'black', shape: 'rect', label: 'pay', tagline: false, height: 48 }}
        disabled={isLoading}
        forceReRender={[totalAmount]}
        createOrder={(data: CreateOrderData, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalAmount.toFixed(2),
                  currency_code: 'EUR',
                },
              },
            ],
          });
        }}
        onApprove={(data: OnApproveData, actions) => {
          setIsLoading(true);
          return actions.order!.capture().then(async (details) => {
            await handleSuccessfulPayment("paypal", details.id);
          });
        }}
        onError={(err) => {
            console.error("PayPal Error:", err);
            toast({
                variant: "destructive",
                title: "Error con PayPal",
                description: "No se pudo iniciar el proceso de pago de PayPal.",
            });
            setIsLoading(false);
        }}
        onCancel={() => {
            setIsLoading(false);
        }}
      />
    </div>
  );
}

export function PaymentForm({ cartItems, customerInfo }: PaymentFormProps) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems, customerInfo }),
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
  }, [cartItems, customerInfo]);

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
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <PayPalScriptProvider options={{ clientId: paypalClientId, currency: "EUR" }}>
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm cartItems={cartItems} customerInfo={customerInfo}/>
        </Elements>
      ) : (
        <div className="flex justify-center items-center h-48">
            <Loader2 className="h-8 w-8 animate-spin"/>
        </div>
      )}
    </PayPalScriptProvider>
  );
}
