
"use client";

import { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import type { Ticket } from '@/lib/types';
import { initializeFirebase } from '@/firebase';
import { MobileTicketVisual } from '@/components/mobileapp/MobileTicketVisual';
import { Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Get firestore instance
const { firestore } = initializeFirebase();

// Firestore query function
async function getTicketsForUser(email: string): Promise<Ticket[]> {
    const ticketsCollection = collection(firestore, 'tickets');
    const q = query(ticketsCollection, where("customerEmail", "==", email));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => doc.data() as Ticket);
}


export default function MyTicketsPage() {
    const { user } = useApp();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            setIsLoading(true);
            getTicketsForUser(user.email)
                .then(userTickets => {
                    setTickets(userTickets);
                })
                .catch(console.error)
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, [user]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <Loader2 className="h-10 w-10 text-yellow-400 animate-spin" />
            </div>
        )
    }

    if (tickets.length === 0) {
        return (
            <div className="text-center flex flex-col items-center justify-center h-[70vh]">
                <h2 className="text-2xl font-bold text-white mb-4">No tienes boletos</h2>
                <p className="text-gray-400 mb-8">Parece que aún no has comprado ningún boleto.</p>
                <Button asChild className="rounded-full bg-yellow-400 text-black hover:bg-yellow-500 w-32 h-32 flex items-center justify-center shadow-lg transition-transform hover:scale-105">
                    <Link href="/">
                        <Plus className="h-16 w-16" />
                    </Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-8 animate-fade-in-up">
            <h1 className="text-3xl font-bold text-yellow-400 mb-8 text-center">Mis Boletos</h1>
            {tickets.map(ticket => (
                <div key={ticket.id} className="flex justify-center">
                    <MobileTicketVisual ticket={ticket} />
                </div>
            ))}
        </div>
    )

}
