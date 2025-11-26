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
    <div className="bg-transparent min-h-screen">
      <div className="container mx-auto max-w-screen-lg px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl">Consigue tus entradas</h1>
          <p className="mt-4 text-lg text-black font-bold max-w-3xl mx-auto">
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
                  className={`transition-all duration-150 ease-out hover:-translate-y-1 ${quantity > 0 ? 'bg-primary' : 'bg-white'}`}
                >
                  <CardHeader>
                    <CardTitle className="text-3xl">{ticket.name}</CardTitle>
                    <CardDescription className="text-4xl !font-black !text-black !-webkit-text-stroke-0 !no-underline" style={{textShadow: 'none'}}>
                      {ticket.price} EUR
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-black font-bold">
                      {ticket.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-black" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="bg-white/50 p-4 border-t-4 border-black">
                    <div className="flex w-full justify-between items-center">
                      <p className="text-sm text-black font-bold">Cantidad:</p>
                      <div className="flex items-center gap-2">
                        <Button variant="secondary" size="icon" onClick={() => updateQuantity(ticket.id, Math.max(0, quantity - 1))}>
                          <Minus className="h-5 w-5" />
                        </Button>
                        <span className="font-bold text-xl w-8 text-center text-black">{quantity}</span>
                        <Button variant="secondary" size="icon" onClick={() => updateQuantity(ticket.id, quantity + 1)}>
                          <Plus className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
             {ticketTypes.filter(t => !t.isAvailable).map(ticket => (
                <Card key={ticket.id} className="relative overflow-hidden opacity-70 bg-gray-300">
                    <div className="absolute top-8 -right-12 transform rotate-45 bg-red-500 text-center text-white font-bold py-1 w-48 shadow-lg z-10 border-2 border-black">
                      AGOTADO
                    </div>
                   <CardHeader>
                    <CardTitle className="text-3xl text-gray-500">{ticket.name}</CardTitle>
                    <CardDescription className="text-4xl !font-black !text-gray-600 !-webkit-text-stroke-0" style={{textShadow: 'none'}}>{ticket.price} EUR</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm font-bold text-gray-600">
                      {ticket.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-5 w-5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                   <CardFooter className="p-4 border-t-4 border-black">
                    <div className="flex justify-between items-center w-full">
                      <p className="text-sm text-gray-600 font-bold">Cantidad:</p>
                      <div className="flex items-center gap-2">
                        <Button variant="secondary" size="icon" disabled>
                          <Minus className="h-5 w-5" />
                        </Button>
                        <span className="font-bold text-xl w-8 text-center text-gray-600">0</span>
                        <Button variant="secondary" size="icon" disabled>
                          <Plus className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
             ))}
          </div>

          <div className="sticky top-24 lg:col-span-1">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-2">
                    <ShoppingCart className="h-8 w-8"/>
                    Resumen
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.length === 0 ? (
                  <p className="text-muted-foreground font-bold text-center py-8">Aún no has seleccionado ninguna entrada.</p>
                ) : (
                  <div className="space-y-4 font-bold text-black">
                    {cartItems.map(item => {
                      const ticket = ticketTypes.find(t => t.id === item.ticketTypeId);
                      if (!ticket) return null;
                      return (
                        <div key={item.ticketTypeId} className="flex justify-between items-center">
                          <div>
                            <p>{ticket.name}</p>
                            <p className="text-sm text-gray-600">x {item.quantity}</p>
                          </div>
                          <p>{(ticket.price * item.quantity).toFixed(2)} EUR</p>
                        </div>
                      )
                    })}
                    <hr className="my-4 border-dashed border-black" />
                    <div className="flex justify-between items-center text-xl">
                      <p>Total ({totalItems} {totalItems === 1 ? 'entrada' : 'entradas'})</p>
                      <p>{total.toFixed(2)} EUR</p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full text-lg" size="lg" disabled={cartItems.length === 0} onClick={handleContinue}>
                  Continuar
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
