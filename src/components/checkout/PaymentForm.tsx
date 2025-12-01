
"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { createOrderAndTickets } from "@/lib/orders-service";
import { useRouter } from "next/navigation";
import { ticketTypes } from "@/lib/data";

interface PaymentFormProps {
  cartItems: { ticketTypeId: string; quantity: number }[];
  customerInfo: {
    fullName: string;
    email: string;
    country: string;
    city?: string;
  };
}

export function PaymentForm({ cartItems, customerInfo }: PaymentFormProps) {
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
      router.push('/payment/failure');
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      await handleSuccessfulPayment("stripe", paymentIntent.id);
    } else {
        setMessage("El pago no se completó. Estado: " + paymentIntent?.status);
        setIsLoading(false);
        router.push('/payment/failure');
    }
  };

  const handleSuccessfulPayment = async (provider: 'stripe', transactionId: string) => {
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
          Pagar {totalAmount.toFixed(2)} EUR
        </Button>
        {message && <div id="payment-message" className="text-destructive text-sm">{message}</div>}
      </form>
    </div>
  );
}
