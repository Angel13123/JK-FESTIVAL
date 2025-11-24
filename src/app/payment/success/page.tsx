"use client";

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Ticket, Loader2 } from "lucide-react";
import Link from "next/link";
import { getTicketsByOrderId } from '@/lib/orders-service';
import type { Ticket as TicketType } from '@/lib/types';
import QRCode from 'qrcode.react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      const fetchTickets = async () => {
        try {
          const fetchedTickets = await getTicketsByOrderId(orderId);
          setTickets(fetchedTickets);
        } catch (error) {
          console.error("Failed to fetch tickets:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchTickets();
    } else {
        setLoading(false);
    }
  }, [orderId]);


  return (
     <div className="container mx-auto max-w-screen-md px-4 py-16 flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-lg text-center shadow-lg animate-fade-in-down">
            <CardHeader className="items-center">
                <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <CardTitle className="text-3xl font-headline mt-4">¡Pago completado con éxito!</CardTitle>
                <CardDescription className="text-base">Gracias por tu compra.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Hemos recibido tu pago y tus entradas han sido generadas. Recibirás un correo electrónico con todos los detalles.
                </p>
                {loading ? (
                    <div className="flex justify-center items-center mt-6">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : tickets.length > 0 ? (
                    <div className="mt-6 bg-muted p-4 rounded-lg border border-dashed text-left">
                        <h3 className="font-bold text-lg text-center mb-3">Tus entradas:</h3>
                        <div className="space-y-4 max-h-60 overflow-y-auto p-2">
                        {tickets.map(ticket => (
                            <div key={ticket.id} className="flex items-center justify-between gap-4 bg-background p-3 rounded-md">
                                <div className='flex items-center gap-4'>
                                    <Ticket className="h-6 w-6 text-primary flex-shrink-0"/>
                                    <div>
                                        <p className="font-mono text-lg font-bold tracking-widest text-primary">
                                            {ticket.code}
                                        </p>
                                        <p className="text-xs text-muted-foreground">{ticket.ticketTypeName}</p>
                                    </div>
                                </div>
                                <div className="p-1 bg-white rounded-md">
                                    <QRCode value={ticket.code} size={64} />
                                </div>
                            </div>
                        ))}
                        </div>
                         <p className="text-xs text-muted-foreground mt-3 text-center">
                           Presenta el código QR en la entrada del festival.
                        </p>
                    </div>
                ) : (
                    <div className="mt-6 text-muted-foreground">No se encontraron los códigos de tus entradas.</div>
                )}
                <div className="mt-8 flex justify-center gap-4">
                    <Button asChild>
                        <Link href="/">Volver al inicio</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/admin">Ir al panel de admin</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center min-h-[60vh]"><Loader2 className="h-10 w-10 animate-spin" /></div>}>
            <SuccessContent />
        </Suspense>
    )
}
