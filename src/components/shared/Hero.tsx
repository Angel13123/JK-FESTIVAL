
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/shared/Countdown";

const LeftSquiggle = () => (
    <svg width="107" height="90" viewBox="0 0 107 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -left-4 md:left-0 top-1/2 -translate-y-1/2 h-20 md:h-36 w-auto text-primary">
      <path d="M96.9231 3.39209C83.9231 29.8921 68.4231 29.8921 54.9231 43.3921C41.4231 56.8921 44.4231 79.3921 26.4231 85.3921C8.42308 91.3921 -6.57692 73.3921 3.42308 55.3921C13.4231 37.3921 28.4231 11.8921 51.9231 3.39209" stroke="black" strokeWidth="6" strokeLinecap="round"/>
      <path d="M96.9231 3.39209C83.9231 29.8921 68.4231 29.8921 54.9231 43.3921C41.4231 56.8921 44.4231 79.3921 26.4231 85.3921C8.42308 91.3921 -6.57692 73.3921 3.42308 55.3921C13.4231 37.3921 28.4231 11.8921 51.9231 3.39209" fill="currentColor"/>
    </svg>
);

const RightSquiggle = () => (
    <svg width="109" height="88" viewBox="0 0 109 88" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -right-4 md:right-0 top-1/2 -translate-y-1/2 h-20 md:h-36 w-auto text-primary">
       <path d="M12.0769 85.0754C25.0769 58.5754 40.5769 58.5754 54.0769 45.0754C67.5769 31.5754 64.5769 9.07538 82.5769 3.07538C100.577 -2.92462 115.577 15.0754 105.577 33.0754C95.5769 51.0754 80.5769 76.5754 57.0769 85.0754" stroke="black" strokeWidth="6" strokeLinecap="round"/>
       <path d="M12.0769 85.0754C25.0769 58.5754 40.5769 58.5754 54.0769 45.0754C67.5769 31.5754 64.5769 9.07538 82.5769 3.07538C100.577 -2.92462 115.577 15.0754 105.577 33.0754C95.5769 51.0754 80.5769 76.5754 57.0769 85.0754" fill="currentColor"/>
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
