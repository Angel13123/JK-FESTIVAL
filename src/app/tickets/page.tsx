"use client";

import { ticketTypes } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Minus, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TicketsPage() {
  const { cartItems, updateQuantity, getCartTotal } = useCart();
  const router = useRouter();

  const handleContinue = () => {
    router.push('/checkout');
  };

  const total = getCartTotal(ticketTypes);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-card">
      <div className="container mx-auto max-w-screen-lg px-4 py-16">
        <div className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">Consigue tus entradas</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Asegura tu sitio en el JK Festival. Elige tu experiencia y prepárate para vivir algo único.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {ticketTypes.filter(t => t.isAvailable).map((ticket, index) => {
              const cartItem = cartItems.find(item => item.ticketTypeId === ticket.id);
              const quantity = cartItem ? cartItem.quantity : 0;
              return (
                <Card 
                  key={ticket.id} 
                  className={`transition-all duration-300 ease-out hover:shadow-xl transform hover:-translate-y-1 animate-fade-in-up ${quantity > 0 ? 'border-primary ring-2 ring-primary' : ''}`}
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
                >
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">{ticket.name}</CardTitle>
                    <CardDescription className="text-3xl font-bold text-primary">{ticket.price} EUR</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {ticket.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center bg-muted/50 p-4">
                    <p className="text-sm text-muted-foreground font-semibold">Cantidad:</p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={() => updateQuantity(ticket.id, Math.max(0, quantity - 1))} className="bg-background">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="font-bold text-lg w-8 text-center">{quantity}</span>
                      <Button variant="outline" size="icon" onClick={() => updateQuantity(ticket.id, quantity + 1)} className="bg-background">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
             {ticketTypes.filter(t => !t.isAvailable).map(ticket => (
                <Card key={ticket.id} className="opacity-60 bg-muted">
                   <CardHeader>
                    <CardTitle className="font-headline text-2xl flex justify-between">
                        {ticket.name}
                        <span className="text-destructive text-sm font-body font-bold">AGOTADO</span>
                    </CardTitle>
                    <CardDescription className="text-3xl font-bold text-muted-foreground">{ticket.price} EUR</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {ticket.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-muted-foreground" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
             ))}
          </div>

          <div className="sticky top-24 animate-fade-in lg:col-span-1">
            <Card className="bg-background shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                    <ShoppingCart className="h-6 w-6 text-primary"/>
                    Resumen del pedido
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Aún no has seleccionado ninguna entrada.</p>
                ) : (
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
                      <p>Total ({totalItems} {totalItems === 1 ? 'entrada' : 'entradas'})</p>
                      <p>{total.toFixed(2)} EUR</p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full transition-transform duration-300 hover:scale-105" size="lg" disabled={cartItems.length === 0} onClick={handleContinue}>
                  Continuar con la compra
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
