import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Countdown } from "@/components/shared/Countdown";

export function Hero() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero');

  return (
    <section className="relative w-full h-[90vh] min-h-[700px] flex items-center justify-center text-center text-white overflow-hidden">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover animate-zoom-in-out"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      <div className="relative z-10 flex flex-col items-center gap-6 p-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-headline tracking-tighter drop-shadow-lg animate-fade-in-down">
          JK Festival
        </h1>
        <p className="text-lg md:text-xl font-semibold text-primary-foreground/90 drop-shadow-md animate-fade-in-up delay-200">
          7 FEB 2026 – Martil, Marruecos
        </p>
        <p className="max-w-2xl text-base md:text-lg text-primary-foreground/80 drop-shadow animate-fade-in-up delay-300">
          El epicentro de la música urbana para la nueva generación del norte de Marruecos. Ritmo, cultura y una experiencia inolvidable.
        </p>
        
        <div className="mt-4 animate-fade-in-up delay-500">
          <Countdown />
        </div>
        
        <div className="mt-4 animate-fade-in-up delay-700">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full shadow-lg transition-transform duration-300 hover:scale-105 transform hover:-translate-y-1">
            <Link href="/tickets">Comprar entradas</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
