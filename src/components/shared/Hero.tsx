import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/shared/Countdown";

const Squiggle = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 20"
    xmlns="http://www.w3.org/2000/svg"
    className={`absolute w-32 md:w-48 h-auto text-black ${className}`}
  >
    <path
      d="M 5,10 C 20,20 30,0 45,10 C 60,20 70,0 85,10 C 95,20 100,10 100,10"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);


export function Hero() {

  return (
    <section 
      className="relative w-full min-h-[calc(100vh-80px)] overflow-hidden flex items-center justify-center p-4"
    >
        <div className="absolute inset-0 bg-gradient-to-b from-[#00FFFF] to-[#DFFF00] animate-[ken-burns_20s_ease-in-out_infinite]"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          }}
        ></div>

        <Squiggle className="top-4 left-4 -rotate-12 animate-[wiggle_4s_ease-in-out_infinite]" />
        <Squiggle className="top-8 right-4 rotate-[20deg] animate-[wiggle_5s_ease-in-out_infinite_reverse]" />
        <Squiggle className="bottom-8 left-1/4 -rotate-[25deg] animate-[float_6s_ease-in-out_infinite]" />


      <div className="relative z-10 h-full flex flex-col items-center justify-start pt-10 md:pt-20 gap-4 text-center">
        <h1 
            className="text-7xl md:text-9xl lg:text-[10rem] leading-none uppercase font-headline tracking-tighter"
            style={{ filter: 'drop-shadow(6px 6px 0px black)'}}
        >
          JK Festival
        </h1>
        <h2 className="text-xl md:text-2xl font-extrabold text-black uppercase tracking-wider -mt-4 md:-mt-8">
            7 FEB 2026 – Martil, Morocco
        </h2>
        
        <div className="mt-8">
          <Countdown />
        </div>
        
        <div className="mt-10">
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="/tickets">Comprar entradas</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
