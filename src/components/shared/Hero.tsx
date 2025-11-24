import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Countdown } from "@/components/shared/Countdown";

export function Hero() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero');

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center text-center text-white overflow-hidden">
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
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 flex flex-col items-center gap-6 p-4">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold uppercase font-headline tracking-tighter drop-shadow-lg animate-fade-in-down neon-glow-primary">
          JK Festival
        </h1>
        <p className="text-lg md:text-xl font-semibold text-primary-foreground/90 drop-shadow-md animate-fade-in-up delay-200">
          7 FEB 2026 – Martil, Marruecos
        </p>
        
        <div className="mt-8 animate-fade-in-up delay-500">
          <Countdown />
        </div>
        
        <div className="mt-8 animate-fade-in-up delay-700">
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 transform hover:-translate-y-1">
            <Link href="/tickets">Comprar entradas</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
