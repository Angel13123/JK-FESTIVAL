
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ticketTypes } from '@/lib/data';
import type { TicketType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Minus, Plus, ShoppingCart, Ticket } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function TicketCard({ type, onAddToCart, onQuantityChange, quantity }: { type: TicketType, onAddToCart: () => void, onQuantityChange: (q: number) => void, quantity: number }) {
  return (
    <Card className="flex flex-col bg-card text-card-foreground transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1 transform animate-fade-in-up">
      <CardHeader>
        <CardTitle>{type.name}</CardTitle>
        <CardDescription className="text-3xl font-bold text-primary">{type.price} EUR</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {type.benefits.map((benefit, index) => (
            <li key={index} className="flex items-center gap-2">
              <Ticket className="h-4 w-4 text-primary" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <div className="p-6 pt-0">
        {quantity > 0 ? (
          <div className="flex items-center justify-between gap-2">
            <div className='flex items-center gap-2'>
              <Button variant="outline" size="icon" onClick={() => onQuantityChange(quantity - 1)}><Minus className="h-4 w-4" /></Button>
              <span className="font-bold text-lg w-8 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={() => onQuantityChange(quantity + 1)}><Plus className="h-4 w-4" /></Button>
            </div>
            <p className="font-semibold">{(type.price * quantity).toFixed(2)} EUR</p>
          </div>
        ) : (
          <Button onClick={onAddToCart} className="w-full" disabled={!type.isAvailable}>
            {type.isAvailable ? 'Añadir al carrito' : 'Agotado'}
          </Button>
        )}
      </div>
    </Card>
  );
}

export default function TicketsPage() {
  const { cartItems, updateQuantity, getCartTotal } = useCart();
  const { toast } = useToast();
  const total = getCartTotal(ticketTypes);

  const handleAddToCart = (ticketTypeId: string) => {
    updateQuantity(ticketTypeId, 1);
    toast({
      title: "¡Entrada añadida!",
      description: "Has añadido una entrada a tu carrito.",
    });
  };

  const handleQuantityChange = (ticketTypeId: string, newQuantity: number) => {
    updateQuantity(ticketTypeId, newQuantity);
  };
  
  return (
    <div className="bg-transparent">
      <div className="container mx-auto max-w-screen-lg px-4 py-16">
        <div className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl tracking-tight">Elige tus Entradas</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Asegura tu sitio en el evento del año. Elige el tipo de entrada que mejor se adapte a ti.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ticketTypes.map((type, index) => {
            const cartItem = cartItems.find(item => item.ticketTypeId === type.id);
            return (
              <div key={type.id} style={{ animationDelay: `${index * 100}ms`}}>
                <TicketCard 
                  type={type} 
                  onAddToCart={() => handleAddToCart(type.id)}
                  onQuantityChange={(newQuantity) => handleQuantityChange(type.id, newQuantity)}
                  quantity={cartItem?.quantity || 0}
                />
              </div>
            );
          })}
        </div>

        {cartItems.length > 0 && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md p-4 z-50 animate-fade-in-up">
            <div className="bg-background/80 backdrop-blur-sm border rounded-xl shadow-lg p-4 flex justify-between items-center">
              <div>
                <p className="font-bold">Total: {total.toFixed(2)} EUR</p>
                <p className="text-sm text-muted-foreground">{cartItems.reduce((acc, item) => acc + item.quantity, 0)} entradas</p>
              </div>
              <Button asChild>
                <Link href="/checkout">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Finalizar Compra
                </Link>
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
