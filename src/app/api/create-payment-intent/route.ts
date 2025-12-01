
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { ticketTypes } from '@/lib/data';
import type { CartItem } from '@/lib/types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

function calculateOrderAmount(items: CartItem[]): number {
  const total = items.reduce((acc, item) => {
    const ticketType = ticketTypes.find(t => t.id === item.ticketTypeId);
    if (!ticketType) {
      // In a real app, you might throw an error if a ticket type isn't found
      return acc;
    }
    return acc + (ticketType.price * item.quantity);
  }, 0);

  // Stripe expects the amount in the smallest currency unit (e.g., cents)
  return Math.round(total * 100);
}

export async function POST(request: Request) {
  try {
    const { cartItems, customerInfo } = await request.json();

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json({ error: 'Invalid cart items' }, { status: 400 });
    }
    
    if (!customerInfo || !customerInfo.email || !customerInfo.fullName) {
      return NextResponse.json({ error: 'Customer information is missing' }, { status: 400 });
    }

    const amount = calculateOrderAmount(cartItems);
    
    if (amount <= 0) {
        return NextResponse.json({ error: 'Invalid order amount' }, { status: 400 });
    }

    // Check if a customer with this email already exists
    const customers = await stripe.customers.list({ email: customerInfo.email, limit: 1 });
    let customer;

    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      // Create a new customer in Stripe
      customer = await stripe.customers.create({
        email: customerInfo.email,
        name: customerInfo.fullName,
      });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'eur',
      customer: customer.id,
      payment_method_types: ['card'],
      metadata: {
        cart: JSON.stringify(cartItems),
        customerName: customerInfo.fullName,
        customerEmail: customerInfo.email,
        customerCountry: customerInfo.country || '',
      }
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err: any) {
    console.error('Error creating Payment Intent:', err);
    return NextResponse.json({ error: `Internal Server Error: ${err.message}` }, { status: 500 });
  }
}
