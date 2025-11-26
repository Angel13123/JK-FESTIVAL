
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
    <div className="w-full max-w-sm rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 font-sans shadow-2xl shadow-purple-500/30 text-white">
        {/* Top Part */}
        <div className="p-5 border-b-2 border-dashed border-white/20">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <Music className="h-6 w-6" />
                    <span className="text-xl font-extrabold tracking-tight">JK FESTIVAL</span>
                </div>
                <div className={`text-sm font-bold uppercase px-2 py-1 rounded ${ticket.status === 'valid' ? 'bg-green-500/80' : 'bg-yellow-500/80'}`}>
                    {ticket.status}
                </div>
            </div>
            
            <div className="text-center">
                <p className="text-sm opacity-80">Propietario del Boleto</p>
                <p className="text-2xl font-bold tracking-wider">{ticket.ownerName}</p>
                <p className="text-lg font-semibold text-yellow-300">{ticket.ticketTypeName}</p>
            </div>
        </div>

        {/* Bottom Part with QR */}
        <div className="p-5 flex items-center justify-center">
            <div className="bg-white p-2 rounded-lg">
                <QRCode value={ticket.code} size={128} bgColor="#ffffff" fgColor="#000000" />
            </div>
            <div className="pl-4 border-l-2 border-dashed border-white/20 ml-4 flex flex-col justify-center">
                 <p className="font-mono text-lg font-bold tracking-widest">{ticket.code}</p>
                 <p className="text-xs opacity-70 mt-1">
                    {purchaseDate ? format(purchaseDate, "d MMM yyyy, HH:mm", { locale: es }) : 'N/A'}
                 </p>
            </div>
        </div>
    </div>
  );
}
