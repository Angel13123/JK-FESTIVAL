
"use client";

import QRCode from "qrcode.react";
import type { Ticket } from "@/lib/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Timestamp } from "firebase/firestore";

interface MobileTicketVisualProps {
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

export function MobileTicketVisual({ ticket }: MobileTicketVisualProps) {
  const purchaseDate = getJsDateFromTimestamp(ticket.createdAt);

  return (
    <div className="bg-white text-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6 flex flex-col items-center gap-6 w-full max-w-sm mx-auto">
        
        {/* Header Section */}
        <div className="text-center">
            <h2 
                className="text-4xl font-headline text-yellow-400"
                style={{ WebkitTextStroke: '2px black', textShadow: '3px 3px 0px #000' }}
            >
                JK FESTIVAL
            </h2>
            <p className="font-bold text-sm">GRAND STADE DE MARTIL | 07/FEB/2026</p>
             <div className="mt-4 inline-block">
                <span 
                    className="text-black font-extrabold text-lg bg-yellow-400 border-2 border-black px-4 py-1 rounded-md uppercase"
                    style={{boxShadow: '3px 3px 0px #000'}}
                >
                    {ticket.ticketTypeName}
                </span>
            </div>
        </div>

        {/* QR Code Section */}
        <div className="w-full p-2 border-4 border-black bg-white rounded-lg flex justify-center items-center">
            {ticket.code ? (
              <QRCode 
                  value={ticket.code} 
                  size={256}
                  bgColor="#ffffff" 
                  fgColor="#000000" 
              />
            ) : (
              <div className="w-[256px] h-[256px] bg-gray-100 flex items-center justify-center text-center text-sm text-gray-500">
                Código QR no disponible
              </div>
            )}
        </div>

        {/* Alphanumeric Code Section */}
        <div className="text-center">
            <p className="text-xs font-bold text-gray-600">CÓDIGO DE ACCESO:</p>
            <p className="font-mono text-xl font-black break-all">{ticket.code || 'N/A'}</p>
        </div>

        {/* Footer Section */}
        <div className="border-t-2 border-dashed border-gray-300 w-full pt-4 text-center text-xs text-gray-700">
            <p><strong>Propietario:</strong> {ticket.ownerName}</p>
            <p><strong>Fecha de Compra:</strong> {purchaseDate ? format(purchaseDate, "d MMM yyyy, HH:mm", { locale: es }) : 'N/A'}</p>
        </div>
    </div>
  );
}
