
"use client";
import { useApp } from "@/context/AppContext";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { MobileCountdown } from "@/components/mobileapp/MobileCountdown";
import { MapPin, Check, X, CalendarDays, HelpCircle } from "lucide-react";
import { artists } from "@/lib/data";

const ArtistOfTheDay = () => {
    const artist = artists[0]; // Using 'Aureo' as a mock
    return (
        <Card className="bg-gray-900 border-gray-800 text-white overflow-hidden relative group">
            <div className="relative h-60 w-full">
                <Image 
                    src={artist.imageUrl}
                    alt={artist.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    data-ai-hint="artist portrait"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 p-6">
                <p className="text-sm font-bold text-yellow-400">Artista del Día</p>
                <h3 className="text-4xl font-extrabold text-white">{artist.name}</h3>
                <p className="text-md font-semibold text-gray-300">R&B / Soul</p>
            </div>
        </Card>
    )
}

const QuickActions = () => (
    <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gray-900 border-gray-800 p-4 flex flex-col items-center justify-center text-center gap-2 hover:border-cyan-400 transition-colors">
            <a href="https://www.google.com/maps/search/?api=1&query=Grand+Stade+de+Martil,+Morocco" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2">
                <MapPin className="h-8 w-8 text-cyan-400"/>
                <p className="font-bold text-white text-sm">CÓMO LLEGAR</p>
            </a>
        </Card>
        <Card className="bg-gray-900 border-gray-800 p-4 flex flex-col items-center justify-center text-center gap-2">
             <CalendarDays className="h-8 w-8 text-cyan-400"/>
             <p className="font-bold text-white text-sm">HORARIOS</p>
        </Card>
        <Card className="bg-gray-900 border-gray-800 p-4 text-left col-span-2">
             <h4 className="font-bold text-white text-center mb-3">🎒 QUÉ LLEVAR</h4>
             <ul className="text-sm space-y-2">
                 <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500 flex-shrink-0"/> <span className="text-gray-300">Boleto Digital</span></li>
                 <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500 flex-shrink-0"/> <span className="text-gray-300">ID / DNI</span></li>
                 <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500 flex-shrink-0"/> <span className="text-gray-300">Ropa Cómoda</span></li>
                 <li className="flex items-center gap-2"><X className="h-4 w-4 text-red-500 flex-shrink-0"/> <span className="text-gray-300">Cámaras Profesionales</span></li>
             </ul>
        </Card>
         <Card className="bg-gray-900 border-gray-800 p-4 flex flex-col items-center justify-center text-center gap-2 hover:border-cyan-400 transition-colors col-span-2">
            <Link href="/faq" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2">
                <HelpCircle className="h-8 w-8 text-cyan-400"/>
                <p className="font-bold text-white text-sm">PREGUNTAS FRECUENTES</p>
            </Link>
        </Card>
    </div>
)

const NewsSection = () => (
     <div>
        <h2 className="text-xl font-bold text-yellow-400 mb-4">Últimas Noticias</h2>
        <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6 text-center text-gray-500">
                <p>📢 Mantente atento. Las noticias oficiales aparecerán aquí muy pronto.</p>
            </CardContent>
        </Card>
    </div>
)


export default function MobileAppHomePage() {
  const { user, isGuest } = useApp();
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    const calculateDays = () => {
        const festivalDate = new Date('2026-02-07T00:00:00');
        const now = new Date();
        const difference = festivalDate.getTime() - now.getTime();
        const days = Math.ceil(difference / (1000 * 3600 * 24));
        setDaysLeft(days > 0 ? days : 0);
    }
    calculateDays();
  }, []);

  const greeting = isGuest ? "¡Hola, Invitado!" : (user ? `¡Hola, ${user.username}!` : "¡Bienvenido!");

  return (
    <div className="space-y-6 pb-24 animate-fade-in-up">
        {/* Dynamic Header */}
        <div>
            <h1 className="text-2xl font-bold text-white">{greeting}</h1>
            {daysLeft !== null && (
                 <p className="text-yellow-400 text-lg font-bold">
                    Faltan <span className="text-3xl">{daysLeft}</span> Días para el JK Festival
                 </p>
            )}
        </div>
        
        <div className="mt-4">
            <MobileCountdown />
        </div>

        {/* Artist of the Day */}
        <ArtistOfTheDay />

        {/* Quick Actions Grid */}
        <QuickActions />

        {/* News Section */}
        <NewsSection />
    </div>
  );
}
