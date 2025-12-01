
"use client";

import { Suspense, useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { toPng } from 'html-to-image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Loader2, Download, Smartphone } from "lucide-react";
import Link from "next/link";
import { getTicketsByOrderId } from '@/lib/orders-service';
import type { Ticket as TicketType } from '@/lib/types';
import { TicketVisual } from '@/components/shared/TicketVisual';
import { PwaInstallButton } from '@/components/shared/PwaInstallButton';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);

  // Create a ref for each ticket visual component
  const ticketRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (orderId) {
      const fetchTickets = async () => {
        try {
          // Retry logic to give backend time to create tickets
          let fetchedTickets: TicketType[] = [];
          for (let i = 0; i < 5; i++) { // Try up to 5 times
            fetchedTickets = await getTicketsByOrderId(orderId);
            if (fetchedTickets.length > 0) {
              break;
            }
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
          }
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

  const handleDownload = useCallback(async (ticket: TicketType) => {
    const ticketNode = ticketRefs.current[ticket.id];
    if (!ticketNode) return;

    setDownloading(ticket.id);
    try {
        const dataUrl = await toPng(ticketNode, { 
            cacheBust: true, 
            pixelRatio: 2,
            // Fetch fonts to embed them.
            fetchRequestInit: {
                headers: new Headers(),
                credentials: 'omit'
            }
        });
        const link = document.createElement('a');
        link.download = `JK-Festival-Ticket-${ticket.code}.png`;
        link.href = dataUrl;
        link.click();
    } catch (err) {
        console.error('oops, something went wrong!', err);
    } finally {
        setDownloading(null);
    }
  }, []);

  return (
     <div className="container mx-auto max-w-screen-md px-4 py-16 flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <Card className="w-full max-w-lg text-center shadow-lg animate-fade-in-down bg-card">
            <CardHeader className="items-center">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                    <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-3xl font-headline mt-4">¡Pago completado con éxito!</CardTitle>
                <CardDescription className="text-base text-muted-foreground">Gracias por tu compra.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    {loading ? "Estamos generando tus boletos digitales..." : "Hemos generado tus entradas. Puedes descargarlas ahora o revisar el correo electrónico que te hemos enviado."}
                </p>
                {loading ? (
                    <div className="flex flex-col justify-center items-center mt-6 space-y-4">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        <p className="text-sm text-muted-foreground">Por favor, no cierres esta página.</p>
                    </div>
                ) : tickets.length > 0 ? (
                    <div className="mt-6 text-left">
                        <h3 className="font-bold text-lg text-center mb-4">Tus entradas:</h3>
                        <div className="space-y-4 max-h-80 overflow-y-auto p-2 -mr-2">
                        {tickets.map(ticket => (
                            <div key={ticket.id} className="bg-muted/50 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex-grow">
                                    <p className="font-bold text-primary">{ticket.ticketTypeName}</p>
                                    <p className="font-mono text-sm tracking-widest">{ticket.code}</p>
                                </div>
                                <Button 
                                  onClick={() => handleDownload(ticket)} 
                                  disabled={downloading === ticket.id}
                                  className="w-full sm:w-auto"
                                >
                                  {downloading === ticket.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                                  {downloading === ticket.id ? 'Descargando...' : 'Descargar'}
                                </Button>
                                {/* This element is hidden and used only for generating the image */}
                                <div className="fixed -left-[9999px] top-0 p-4 bg-white">
                                    <div ref={el => (ticketRefs.current[ticket.id] = el)}>
                                        <TicketVisual ticket={ticket} />
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                ) : (
                    <div className="mt-6 text-destructive">No se encontraron tus entradas. Por favor, contacta a soporte si no las recibes por email.</div>
                )}
                 <div className="mt-8 bg-primary/10 border-2 border-dashed border-primary/50 p-4 rounded-lg text-center">
                    <p className="font-bold text-primary mb-2">¿Quieres tener tus boletos a mano?</p>
                    <PwaInstallButton />
                 </div>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Button asChild>
                        <Link href="/">Volver al inicio</Link>
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
