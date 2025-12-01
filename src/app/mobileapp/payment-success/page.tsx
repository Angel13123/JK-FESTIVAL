
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Ticket } from 'lucide-react';

const { firestore } = initializeFirebase();

const LoadingSpinner = () => (
  <div className="relative w-48 h-48">
    <div className="absolute inset-0 border-8 border-cyan-400 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
    <div className="absolute inset-0 flex items-center justify-center">
      <Ticket className="w-24 h-24 text-yellow-400 animate-pulse" />
    </div>
  </div>
);

export default function MobilePaymentSuccessPage() {
  const { user } = useApp();
  const router = useRouter();
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (!user?.email) {
      // Si no hay usuario, no podemos buscar boletos. Redirigir a login tras un tiempo.
      setTimeout(() => router.replace('/mobileapp/login'), 3000);
      return;
    }

    // Listener para los boletos
    const ticketsQuery = query(collection(firestore, 'tickets'), where("customerEmail", "==", user.email), where("createdAt", ">", new Date(Date.now() - 5 * 60 * 1000))); // Check for tickets created in the last 5 mins
    
    const unsubscribe = onSnapshot(ticketsQuery, (snapshot) => {
      if (!snapshot.empty) {
        // Se encontraron boletos
        unsubscribe(); // Dejar de escuchar
        setTimeout(() => {
          router.replace('/mobileapp/tickets');
        }, 2000); // Esperar 2 segundos para que el usuario vea el mensaje
      }
    }, (error) => {
      console.error("Error escuchando boletos:", error);
      // En caso de error en el listener, mostrar el botón de fallback
      setShowFallback(true);
    });

    // Fallback por si algo sale mal o tarda mucho
    const fallbackTimer = setTimeout(() => {
      setShowFallback(true);
    }, 15000);

    return () => {
      unsubscribe();
      clearTimeout(fallbackTimer);
    };

  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-gradient-to-br from-cyan-400 to-yellow-400">
      <div className="animate-fade-in-down">
        <LoadingSpinner />
      </div>
      <h1 
        className="text-4xl md:text-5xl mt-8 animate-fade-in-up font-headline"
        style={{ color: '#F7FF00', WebkitTextStroke: '2px black', textShadow: '4px 4px 0px #000' }}
      >
        ¡PAGO CONFIRMADO!
      </h1>
      <p 
        className="mt-4 text-lg text-black font-bold max-w-sm mx-auto animate-fade-in-up"
        style={{ animationDelay: '0.2s' }}
      >
        Nuestra IA está encriptando tu boleto único... Por favor espera unos segundos.
      </p>
      
      {showFallback && (
        <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <Button onClick={() => router.replace('/mobileapp/tickets')} size="lg">
            Ir a mis boletos
          </Button>
        </div>
      )}
    </div>
  );
}
