
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/shared/Countdown";

const DoodleElements = () => (
    <>
      {/* Doodle Elements - Adjusted for mobile */}
      <svg width="150" height="100" viewBox="0 0 150 100" className="absolute top-4 left-4 w-24 h-16 md:w-36 md:h-24 opacity-80 animate-float" style={{ animationDuration: '4s' }}>
        <path d="M5,50 C25,-10 75,110 95,50 S 135,-10 145,50" stroke="black" strokeWidth="6" fill="none" strokeLinecap="round" />
      </svg>
      <svg width="120" height="80" viewBox="0 0 120 80" className="absolute top-1/2 right-4 -translate-y-1/2 w-20 h-14 md:w-28 md:h-20 opacity-70 animate-float" style={{ animationDuration: '5s' }}>
        <path d="M5,40 C25,80 75,0 95,40 S 105,80 115,40" stroke="black" strokeWidth="6" fill="none" strokeLinecap="round" />
      </svg>
      <svg width="100" height="60" viewBox="0 0 100 60" className="hidden md:block absolute bottom-12 left-10 w-20 h-12 opacity-60 animate-float" style={{ animationDuration: '4.5s' }}>
        <path d="M5,30 C20,0 60,60 80,30 S 95,0 95,30" stroke="black" strokeWidth="6" fill="none" strokeLinecap="round" />
      </svg>
      <svg width="20" height="20" viewBox="0 0 20 20" className="hidden md:block absolute top-1/3 left-[15%] w-6 h-6 opacity-90 animate-float" style={{ animationDuration: '7s' }}><path d="M5,5 L15,15 M15,5 L5,15" stroke="black" strokeWidth="6" fill="none" strokeLinecap="round"/></svg>
      <svg width="20" height="20" viewBox="0 0 20 20" className="absolute bottom-1/4 right-[20%] w-7 h-7 opacity-80 animate-float" style={{ animationDuration: '8s' }}><path d="M5,5 L15,15 M15,5 L5,15" stroke="black" strokeWidth="6" fill="none" strokeLinecap="round"/></svg>
      <svg width="20" height="20" viewBox="0 0 20 20" className="hidden md:block absolute top-20 right-10 w-6 h-6 opacity-90 animate-float" style={{ animationDuration: '3s' }}><path d="M5,5 L15,15 M15,5 L5,15" stroke="black" strokeWidth="6" fill="none" strokeLinecap="round"/></svg>
      <svg width="20" height="20" viewBox="0 0 20 20" className="hidden md:block absolute bottom-1/3 left-[25%] w-5 h-5 opacity-70 animate-float" style={{ animationDuration: '9s' }}><path d="M5,5 L15,15 M15,5 L5,15" stroke="black" strokeWidth="6" fill="none" strokeLinecap="round"/></svg>
      <svg width="20" height="20" viewBox="0 0 20 20" className="absolute top-1/2 right-[15%] w-6 h-6 opacity-80 animate-float" style={{ animationDuration: '4.5s' }}><path d="M5,5 L15,15 M15,5 L5,15" stroke="black" strokeWidth="6" fill="none" strokeLinecap="round"/></svg>
      <svg width="20" height="20" viewBox="0 0 20 20" className="hidden md:block absolute top-3/4 left-[10%] w-6 h-6 opacity-80 animate-float" style={{ animationDuration: '10s' }}><path d="M5,5 L15,15 M15,5 L5,15" stroke="black" strokeWidth="6" fill="none" strokeLinecap="round"/></svg>
      <svg width="20" height="20" viewBox="0 0 20 20" className="hidden md:block absolute top-1/4 right-[5%] w-5 h-5 opacity-70 animate-float" style={{ animationDuration: '5.5s' }}><path d="M5,5 L15,15 M15,5 L5,15" stroke="black" strokeWidth="6" fill="none" strokeLinecap="round"/></svg>
    </>
)


export function Hero() {

  return (
    <section 
      className="relative w-full min-h-[calc(100vh-80px)] overflow-hidden flex flex-col items-center justify-center p-4 bg-transparent py-10"
    >
        
        <div className="relative z-10 flex-grow h-full flex flex-col items-center justify-center gap-2 text-center">
            <DoodleElements />
            
            <div className="relative animate-fade-in-down" style={{ animationDuration: '1.2s' }}>
                 <h1 
                    className="relative text-7xl md:text-9xl lg:text-[10rem] leading-none uppercase font-headline tracking-tighter animate-breath"
                    style={{
                        color: '#F7FF00',
                        WebkitTextStroke: '4px black',
                        textShadow: '8px 8px 0px #000000',
                        animationDuration: '5s',
                    }}
                >
                  JK Festival
                </h1>
            </div>

            <h2 className="text-xl md:text-3xl font-extrabold text-white uppercase tracking-wider -mt-2 animate-fade-in-down" style={{ animationDelay: '0.3s', WebkitTextStroke: '2px black' }}>
                GRAND STADE DE MARTIL
            </h2>
            <h3 className="text-lg md:text-2xl font-extrabold text-white uppercase tracking-wider animate-fade-in-down" style={{ animationDelay: '0.4s', WebkitTextStroke: '2px black' }}>
                07/FEB/2026
            </h3>
            
            <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Countdown />
            </div>
            
            <div className="mt-10 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <Button asChild size="lg" className="text-lg px-8 py-6 bg-[#00FFFF] hover:bg-[#00FFFF]/90 text-black border-4 border-black">
                <Link href="/tickets">Comprar entradas</Link>
              </Button>
            </div>
        </div>
    </section>
  );
}
