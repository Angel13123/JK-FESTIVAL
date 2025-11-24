"use client";

import { useState, useEffect } from 'react';
import { Ticket } from 'lucide-react';

const dummyNotifications = [
    "🔥 Ahmed de Tetuán acaba de comprar 2 Entradas VIP",
    "⚡ Fátima de Rabat ha asegurado su entrada General",
    "🚀 ¡Alguien de Casablanca acaba de comprar 4 entradas!",
    "🎉 Entradas Generales al 85% de capacidad",
    "💥 Youssef de Marrakech se une a la fiesta",
    "✨ ¡Una entrada VIP más vendida para Tánger!"
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function LiveSalesNotification() {
  const [notification, setNotification] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showNotification = () => {
      setIsVisible(false); // Hide current notification
      
      // Wait for fade-out animation before showing the new one
      setTimeout(() => {
        setNotification(getRandomItem(dummyNotifications));
        setIsVisible(true);
      }, 500);

      // Hide notification after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5500);
    };

    // Initial notification
    const initialTimeout = setTimeout(showNotification, 8000);

    // Subsequent notifications every 20 seconds
    const interval = setInterval(showNotification, 20000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  if (!notification) return null;

  return (
    <div 
      className={`fixed bottom-24 left-4 md:bottom-28 md:left-6 z-50 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
    >
      <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-green-400/30 rounded-lg p-2 pr-3 shadow-lg">
        <div className="bg-green-500/20 text-green-400 p-1.5 rounded-full">
            <Ticket className="h-4 w-4" />
        </div>
        <p className="text-xs font-medium text-white">{notification}</p>
      </div>
    </div>
  );
}
