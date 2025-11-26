
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/shared/Countdown";

const DoodleElements = () => (
    <>
      {/* Top-Left Squiggle */}
      <svg width="150" height="100" viewBox="0 0 150 100" className="absolute top-4 left-4 md:top-8 md:left-8 w-24 h-16 md:w-36 md:h-24 opacity-80" style={{ transform: 'rotate(-15deg)'}}>
        <path d="M5,50 C25,-10 75,110 95,50 S 135,-10 145,50" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round" />
      </svg>
       {/* Mid-Right Squiggle */}
      <svg width="120" height="80" viewBox="0 0 120 80" className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 w-20 h-14 md:w-28 md:h-20 opacity-70" style={{ transform: 'rotate(10deg)'}}>
        <path d="M5,40 C25,80 75,0 95,40 S 105,80 115,40" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round" />
      </svg>
       {/* Bottom-Left Squiggle */}
      <svg width="100" height="60" viewBox="0 0 100 60" className="absolute bottom-12 left-10 w-20 h-12 opacity-60" style={{ transform: 'rotate(5deg)'}}>
        <path d="M5,30 C20,0 60,60 80,30 S 95,0 95,30" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round" />
      </svg>
      {/* 'X' Marks */}
      <svg width="20" height="20" viewBox="0 0 20 20" className="absolute top-1/3 left-[15%] w-5 h-5 opacity-90"><path d="M5,5 L15,15 M15,5 L5,15" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round"/></svg>
      <svg width="20" height="20" viewBox="0 0 20 20" className="absolute bottom-1/4 right-[20%] w-6 h-6 opacity-80"><path d="M5,5 L15,15 M15,5 L5,15" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round"/></svg>
      <svg width="20" height="20" viewBox="0 0 20 20" className="absolute top-20 right-10 w-4 h-4 opacity-90"><path d="M5,5 L15,15 M15,5 L5,15" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round"/></svg>
      <svg width="20" height="20" viewBox="0 0 20 20" className="absolute bottom-1/3 left-[25%] w-4 h-4 opacity-70"><path d="M5,5 L15,15 M15,5 L5,15" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round"/></svg>
      <svg width="20" height="20" viewBox="0 0 20 20" className="absolute top-1/2 right-[15%] w-5 h-5 opacity-80"><path d="M5,5 L15,15 M15,5 L5,15" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round"/></svg>
    </>
)


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
        
        <DoodleElements />

      <div className="relative z-10 h-full flex flex-col items-center justify-start pt-10 md:pt-16 gap-2 text-center">
        
        <div className="relative">
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

        <h2 className="text-xl md:text-3xl font-extrabold text-white uppercase tracking-wider -mt-2">
            GRAND STADE DE MARTIL
        </h2>
        <h3 className="text-lg md:text-2xl font-extrabold text-white uppercase tracking-wider">
            07/FEB/2026
        </h3>
        
        <div className="mt-8">
          <Countdown />
        </div>
        
        <div className="mt-10">
          <Button asChild size="lg" className="text-lg px-8 py-6 bg-[#00FFFF] hover:bg-[#00FFFF]/90 text-black border-4 border-black">
            <Link href="/tickets">Comprar entradas</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
