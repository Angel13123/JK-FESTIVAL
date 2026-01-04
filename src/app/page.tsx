
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";

export default function LandingPage() {
  return (
    <main className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* Background Particles */}
      <ParticlesBackground />

      {/* Content Container */}
      <div className="z-10 flex flex-col items-center gap-8 text-center px-4">

        {/* Animated Gradient Text */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] via-[#4169E1] to-[#FFD700] animate-pulse drop-shadow-[0_0_15px_rgba(65,105,225,0.5)] font-serif">
          Cargando en unos instantes estará disponible la experiencia
        </h1>

        {/* Loading Spinner */}
        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-yellow-400 rounded-full animate-spin shadow-[0_0_20px_rgba(255,215,0,0.3)]"></div>

      </div>
    </main>
  );
}
