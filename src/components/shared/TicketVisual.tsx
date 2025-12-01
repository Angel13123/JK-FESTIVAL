
"use client";

import QRCode from "qrcode.react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Timestamp } from "firebase/firestore";
import type { Ticket } from "@/lib/types";
import { Star, Zap } from "lucide-react";

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
    <div className="w-[750px] aspect-[2/1] bg-white text-black p-2 font-body relative overflow-hidden">
        <div className="w-full h-full border-4 border-black flex">
            {/* Left Part */}
            <div className="w-2/3 flex flex-col p-6 border-r-4 border-dashed border-black relative">
                <Star className="absolute top-4 right-4 h-8 w-8 text-black fill-yellow-400 rotate-12" strokeWidth={2}/>
                <Zap className="absolute bottom-16 left-8 h-10 w-10 text-black fill-cyan-400 -rotate-12" strokeWidth={2}/>

                <div className="flex justify-between items-start">
                    <div>
                        <h1 
                            className="text-6xl font-headline text-yellow-400"
                            style={{ WebkitTextStroke: '3px black', textShadow: '4px 4px 0px #000' }}
                        >
                            JK Festival
                        </h1>
                        <p className="font-bold text-lg -mt-2">Grand Stade de Martil, Marruecos</p>
                    </div>
                     <div className={`text-center`}>
                        <p className="font-bold text-xs">ESTADO</p>
                        <p className={`font-mono text-sm font-bold uppercase px-2 py-0.5 rounded border-2 border-black ${ticket.status === 'valid' ? 'bg-green-400' : 'bg-yellow-400'}`}>
                            {ticket.status}
                        </p>
                    </div>
                </div>

                <div className="flex-grow flex flex-col justify-center">
                    <p className="text-sm text-gray-600 font-bold">ENTRADA A NOMBRE DE:</p>
                    <p className="text-4xl font-extrabold tracking-tight truncate">{ticket.ownerName}</p>
                    <p className="text-sm text-gray-600 font-bold mt-3">FECHA DE COMPRA:</p>
                    <p className="text-lg font-bold">
                        {purchaseDate ? format(purchaseDate, "d MMMM, yyyy 'a las' HH:mm", { locale: es }) : 'N/A'}
                    </p>
                </div>
                
                <div 
                    className="text-2xl font-headline text-black text-center border-4 border-black bg-yellow-400 py-1"
                    style={{textShadow: '2px 2px 0px #fff' }}
                >
                    {ticket.ticketTypeName}
                </div>
            </div>
            {/* Right Part */}
            <div className="w-1/3 bg-cyan-300 flex flex-col items-center justify-center p-6 gap-4">
                <div className="bg-white p-2 border-4 border-black">
                     <QRCode value={ticket?.code || 'no-code'} size={160} bgColor="#ffffff" fgColor="#000000" />
                </div>
                 <div className="text-center">
                    <p className="text-xs font-bold text-gray-800">CÓDIGO DE ACCESO:</p>
                    <p className="font-mono text-xl font-black break-all">{ticket.code || 'N/A'}</p>
                </div>
            </div>
        </div>
    </div>
  );
}
