
"use client";

import QRCode from "qrcode.react";
import type { Ticket } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface MobileTicketVisualProps {
  ticket: Ticket;
}

export function MobileTicketVisual({ ticket }: MobileTicketVisualProps) {

  return (
    <div className="w-full max-w-md rounded-2xl bg-gray-900 border border-gray-800 text-white p-6 flex flex-col items-center shadow-lg">
        
        {/* User and Ticket Info */}
        <div className="text-center mb-6">
            <p className="text-lg font-bold tracking-wider text-yellow-400">{ticket.ownerName}</p>
            <p className="text-md text-gray-300">{ticket.ticketTypeName}</p>
        </div>

        {/* QR Code */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 w-[85%] max-w-[400px] aspect-square">
            <QRCode 
                value={ticket.code} 
                size="100%"
                style={{ width: '100%', height: 'auto' }}
                bgColor="#ffffff" 
                fgColor="#000000" 
            />
        </div>

        {/* Alphanumeric Code */}
        <div className="text-center mb-4">
             <p className="font-mono text-4xl font-extrabold text-white tracking-widest">{ticket.code}</p>
        </div>
        
         {/* Status Badge */}
        <Badge variant={ticket.status === 'valid' ? 'default' : 'secondary'} className={`uppercase text-sm font-bold ${ticket.status === 'valid' ? 'bg-green-500' : 'bg-yellow-600'}`}>
            {ticket.status}
        </Badge>
    </div>
  );
}
