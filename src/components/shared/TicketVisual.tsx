
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
    <div className="w-full max-w-sm rounded-2xl bg-gray-900 font-sans shadow-2xl shadow-yellow-500/10">
        {/* Top Part */}
        <div className="p-5 border-b-2 border-dashed border-gray-700">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <Music className="h-6 w-6 text-yellow-400" />
                    <span className="text-xl font-bold tracking-tight text-white">JK FESTIVAL</span>
                </div>
                <div className={`text-sm font-bold uppercase px-2 py-1 rounded ${ticket.status === 'valid' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}`}>
                    {ticket.status}
                </div>
            </div>
            
            <div className="text-center">
                <p className="text-sm text-gray-400">Propietario del Boleto</p>
                <p className="text-2xl font-bold text-white tracking-wider">{ticket.ownerName}</p>
                <p className="text-lg font-semibold text-yellow-400">{ticket.ticketTypeName}</p>
            </div>
        </div>

        {/* Bottom Part with QR */}
        <div className="p-5 flex flex-col items-center justify-center">
            <div className="bg-white p-2 rounded-lg">
                <QRCode value={ticket.code} size={128} bgColor="#ffffff" fgColor="#000000" />
            </div>
            <p className="mt-2 font-mono text-lg font-bold tracking-widest text-white">{ticket.code}</p>
            <p className="text-xs text-gray-500 mt-2">
                {purchaseDate ? format(purchaseDate, "d MMM yyyy, HH:mm", { locale: es }) : 'N/A'}
            </p>
        </div>
    </div>
  );
}
