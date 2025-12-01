
"use client";

import { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import type { Ticket } from '@/lib/types';
import { initializeFirebase } from '@/firebase';
import { MobileTicketVisual } from '@/components/mobileapp/MobileTicketVisual';
import { Loader2, Plus, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Get firestore instance
const { firestore } = initializeFirebase();

// Firestore query function
async function getTicketsForUser(email: string): Promise<Ticket[]> {
    const ticketsCollection = collection(firestore, 'tickets');
    const q = query(ticketsCollection, where("customerEmail", "==", email), orderBy("createdAt", "asc"));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => doc.data() as Ticket);
}


export default function MyTicketsPage() {
    const { user, isGuest } = useApp();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user?.email && !isGuest) {
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
    }, [user, isGuest]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <Loader2 className="h-10 w-10 text-yellow-400 animate-spin" />
            </div>
        )
    }

    if (isGuest) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center">
                <Card className="bg-gray-900 border-gray-800 w-full max-w-md text-center">
                    <CardHeader className="items-center">
                        <LogIn className="h-12 w-12 text-yellow-400 mb-4"/>
                        <CardTitle className="text-white">Inicia sesión para ver tus boletos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-gray-400">Esta sección es solo para usuarios registrados. ¡Inicia sesión para acceder a tus entradas!</p>
                        <Button asChild className="bg-yellow-400 text-black hover:bg-yellow-500">
                            <Link href="/mobileapp/login">Iniciar Sesión / Registrarse</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (tickets.length === 0) {
        return (
            <div className="text-center flex flex-col items-center justify-center h-[70vh]">
                <h2 className="text-2xl font-bold text-white mb-4">No tienes boletos</h2>
                <p className="text-gray-400 mb-8">Parece que aún no has comprado o añadido ningún boleto.</p>
                <Button asChild className="rounded-full bg-yellow-400 text-black hover:bg-yellow-500 w-32 h-32 flex items-center justify-center shadow-lg transition-transform hover:scale-105">
                    <Link href="/mobileapp/add">
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
