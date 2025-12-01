
"use client";

import {
  PaymentElement,
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";

export function PaymentForm() {

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
        <PaymentElement id="payment-element" options={paymentElementOptions} />
    </div>
  );
}

    