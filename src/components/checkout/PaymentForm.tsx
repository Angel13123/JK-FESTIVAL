

"use client";

import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ticketTypes } from "@/lib/data";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CheckoutFormProps {
    onPaymentSuccess: () => void;
}

export const CheckoutForm = ({ onPaymentSuccess }: CheckoutFormProps) => {
    const { getCartTotal } = useCart();
    const total = getCartTotal(ticketTypes);
    const router = useRouter();
    const { toast } = useToast();
    const stripe = useStripe();
    const elements = useElements();

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleStripeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });

        if (error) {
            setMessage(error.message || "Ocurrió un error inesperado.");
            toast({ variant: "destructive", title: "Error en el pago", description: error.message });
            router.push('/payment/failure');
            setIsLoading(false);
            return;
        }

        if (paymentIntent && paymentIntent.status === "succeeded") {
            onPaymentSuccess();
        } else {
             setMessage("El pago no se completó. Estado: " + paymentIntent?.status);
             router.push('/payment/failure');
        }
        
        setIsLoading(false);
    };
    
    const paymentElementOptions = { layout: "tabs" as const };

    return (
        <form onSubmit={handleStripeSubmit} className="space-y-6">
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <Button type="submit" disabled={isLoading || !stripe || !elements} className="w-full" size="lg">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Pagar {total.toFixed(2)} EUR
            </Button>
            {message && <div id="payment-message" className="text-destructive text-sm">{message}</div>}
        </form>
    );
};
