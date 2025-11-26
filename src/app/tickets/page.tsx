"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';
import { TicketVisual } from '@/components/shared/TicketVisual';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Mock ticket data for demonstration
const mockTicket = {
    id: "TICKET_12345",
    orderId: "ORDER_67890",
    ticketTypeId: "vip",
    ticketTypeName: "Entrada VIP",
    ownerName: "Angel",
    customerEmail: "angel@test.com",
    status: 'valid' as 'valid' | 'used' | 'revoked',
    code: "A1B2-C3D4-E5F6-G7H8",
    createdAt: new Date(),
};


export default function MyTicketPage() {
    const [isFlipped, setIsFlipped] = useState(false);

    // This would eventually be replaced by a call to a service to get the user's tickets
    const tickets = [mockTicket];

    if (!tickets || tickets.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <h2 className="text-2xl font-bold mb-2">No tienes entradas</h2>
                <p className="text-muted-foreground mb-4">Parece que aún no has comprado ninguna entrada. </p>
                <Button asChild>
                    <a href="/tickets">Comprar Entradas</a>
                </Button>
            </div>
        )
    }

    const ticket = tickets[0]; // For this example, we'll just show the first ticket.

    const handleShare = () => {
        if(navigator.share) {
            navigator.share({
                title: 'Mi entrada para JK Festival',
                text: `¡No te pierdas JK Festival! Aquí está mi entrada.`,
                url: window.location.href,
            })
        } else {
            // Fallback for browsers that don't support Web Share API
            alert("La función de compartir no está disponible en este navegador.")
        }
    }


    return (
        <div className="p-4 md:p-6 bg-gray-900 min-h-full flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-center mb-6 text-white">Mi Entrada</h1>
            
            <div className="w-full max-w-sm mx-auto">
                 <TicketVisual ticket={ticket} />
            </div>

            <div className="w-full max-w-sm mx-auto mt-6 grid grid-cols-2 gap-4">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="secondary" className="w-full">
                            <Download className="mr-2 h-4 w-4" />
                            Guardar
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Función no implementada</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta función para descargar la imagen de la entrada estará disponible próximamente.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogAction>Entendido</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <Button variant="secondary" onClick={handleShare} className="w-full">
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartir
                </Button>
            </div>
        </div>
    );
}