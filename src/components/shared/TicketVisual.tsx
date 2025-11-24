"use client";

import QRCode from "qrcode.react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Timestamp } from "firebase/firestore";
import type { Ticket } from "@/lib/types";
import { Music, Calendar, User, Ticket as TicketIcon } from "lucide-react";

interface TicketVisualProps {
  ticket: Ticket;
}

const getJsDateFromTimestamp = (timestamp: any): Date | null => {
  if (!timestamp) return null;
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }
  if (typeof timestamp === 'string' || typeof timestamp === 'number') {
    const date = new Date(timestamp);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }
  if (timestamp && typeof timestamp.seconds === 'number') {
    return new Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate();
  }
  return null;
};

export function TicketVisual({ ticket }: TicketVisualProps) {
  const purchaseDate = getJsDateFromTimestamp(ticket.createdAt);

  return (
    <div className="w-[400px] bg-gray-900 text-white font-sans flex flex-col shadow-xl">
        {/* Header */}
        <div className="bg-gray-800 p-4 flex justify-between items-center border-b-2 border-dashed border-gray-700">
            <div className="flex items-center gap-2">
                <Music className="h-6 w-6 text-purple-400" />
                <span className="text-xl font-bold font-headline tracking-tight text-white">JK Festival</span>
            </div>
            <div className="text-right">
                 <p className="text-xs font-semibold text-gray-300">7 FEB 2026</p>
                 <p className="text-xs text-gray-400">Martil, Morocco</p>
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-5">
            <div className="flex gap-5">
                <div className="flex-grow space-y-4">
                    <div>
                        <p className="text-xs text-purple-300 uppercase font-semibold">Propietario</p>
                        <p className="text-lg font-medium text-white flex items-center gap-2">
                           <User className="w-4 h-4 text-gray-400"/> {ticket.ownerName}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-purple-300 uppercase font-semibold">Tipo de Entrada</p>
                        <p className="text-lg font-medium text-white flex items-center gap-2">
                           <TicketIcon className="w-4 h-4 text-gray-400"/> {ticket.ticketTypeName}
                        </p>
                    </div>
                     <div>
                        <p className="text-xs text-purple-300 uppercase font-semibold">Fecha de Compra</p>
                        <p className="text-sm font-medium text-gray-300 flex items-center gap-2">
                           <Calendar className="w-4 h-4 text-gray-400"/>
                           {purchaseDate ? format(purchaseDate, "d MMM yyyy, HH:mm", { locale: es }) : 'N/A'}
                        </p>
                    </div>
                </div>
                <div className="flex-shrink-0 flex flex-col items-center justify-center gap-2 p-2 bg-white rounded-lg">
                    <QRCode value={ticket.code} size={96} bgColor="#ffffff" fgColor="#000000" />
                    <p className="font-mono text-xs font-bold tracking-widest text-black">{ticket.code}</p>
                </div>
            </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-800 px-4 py-2 text-center">
            <p className="text-xs text-gray-400">Presenta este código en la entrada del festival. No lo compartas.</p>
        </div>
    </div>
  );
}
