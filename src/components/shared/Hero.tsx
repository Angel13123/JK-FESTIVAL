import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/shared/Countdown";

export function Hero() {

  return (
    <section 
      className="relative w-full min-h-[calc(100vh-3.5rem)] overflow-hidden flex items-center justify-center p-4"
    >
      <div className="relative z-10 h-full flex flex-col items-center justify-start pt-20 gap-4 text-center">
        <h1 className="text-7xl md:text-9xl lg:text-[10rem] leading-none font-extrabold uppercase font-headline tracking-tighter drop-shadow-lg">
          JK Festival
        </h1>
        <p className="text-xl md:text-2xl font-bold text-black drop-shadow-md">
          7 FEB 2026 – Martil, Morocco
        </p>
        
        <div className="mt-4">
          <Countdown />
        </div>
        
        <div className="mt-6">
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="/tickets">Comprar entradas</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
