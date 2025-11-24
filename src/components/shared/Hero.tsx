import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/shared/Countdown";

export function Hero() {
  return (
    <section 
      className="relative w-full h-[calc(100vh-3.5rem)] min-h-[600px] overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #1a001a 0%, #000000 70%)'
      }}
    >
      {/* CAPA 1: Superposición de efecto de ruido */}
      <div className="absolute inset-0 animate-noise z-[1]"></div>
      
      {/* CAPA 2: Contenido centrado */}
      <div className="relative z-10 h-full flex flex-col items-center justify-start pt-20 gap-4 p-4 text-center text-white">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold uppercase font-headline tracking-tighter drop-shadow-lg animate-neon-flicker">
          JK Festival
        </h1>
        <p className="text-lg md:text-xl font-semibold text-primary-foreground/90 drop-shadow-md animate-fade-in-up delay-200">
          7 FEB 2026 – Martil, Marruecos
        </p>
        
        <div className="mt-4 animate-fade-in-up delay-500">
          <Countdown />
        </div>
        
        <div className="mt-6 animate-fade-in-up delay-700">
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 transform hover:-translate-y-1 animate-shimmer">
            <Link href="/tickets">Comprar entradas</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
