import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/shared/Countdown";

const LeftSquiggle = () => (
    <svg width="107" height="90" viewBox="0 0 107 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -left-4 md:left-0 top-1/2 -translate-y-1/2 h-20 md:h-36 w-auto">
        <path d="M5.48511 85.2393C-6.85214 62.5973 16.2949 53.8417 26.0421 44.5385C42.8421 28.5385 19.5421 5.53852 46.5421 3.03852C65.5421 1.23852 83.5072 13.9135 90.0421 27.5385C97.5421 43.0385 108.542 61.5385 99.0421 78.5385" stroke="black" strokeWidth="6" strokeLinecap="round"/>
    </svg>
);

const RightSquiggle = () => (
    <svg width="109" height="88" viewBox="0 0 109 88" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -right-4 md:right-0 top-1/2 -translate-y-1/2 h-20 md:h-36 w-auto">
        <path d="M103.5 3C116.5 25 92.5 34 82.5 43.5C65.5 60 90.5 83 63 85.5C43.5 87.3 25.5 75.5 19 61.5C11.5 46 0.499998 28 10 11" stroke="black" strokeWidth="6" strokeLinecap="round"/>
    </svg>
);


export function Hero() {

  return (
    <section 
      className="relative w-full min-h-[calc(100vh-80px)] overflow-hidden flex items-center justify-center p-4"
    >
        <div className="absolute inset-0 bg-gradient-to-b from-[#00FFFF] to-[#DFFF00]"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          }}
        ></div>

      <div className="relative z-10 h-full flex flex-col items-center justify-start pt-10 md:pt-16 gap-2 text-center">
        
        <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
                <LeftSquiggle />
                <RightSquiggle />
            </div>
             <h1 
                className="relative text-7xl md:text-9xl lg:text-[10rem] leading-none uppercase font-headline tracking-tighter"
                style={{
                    color: '#F7FF00',
                    WebkitTextStroke: '4px black',
                    textShadow: '8px 8px 0px #000000',
                }}
            >
              JK Festival
            </h1>
        </div>

        <h2 className="text-xl md:text-3xl font-extrabold text-black uppercase tracking-wider -mt-2">
            GRAND STADE DE MARTIL
        </h2>
        <h3 className="text-lg md:text-2xl font-extrabold text-black uppercase tracking-wider">
            07/FEB/2026
        </h3>
        
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
