import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/shared/Hero";
import { LineupPreview } from "@/components/shared/LineupPreview";
import { Location } from "@/components/shared/Location";
import { Sponsors } from "@/components/shared/Sponsors";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

  return (
    <div className="bg-white">
      <Navbar />
      <main>
        <Hero />
        <div className="bg-primary border-y-4 border-black">
          <LineupPreview />
        </div>
        <Location />
        <Sponsors />
        <section 
          className="relative py-16 md:py-24 bg-accent"
        >
          <div className="relative container mx-auto max-w-screen-md px-4 text-center">
              <h2 className="text-4xl md:text-5xl mb-4 text-primary">¿Listo para la experiencia?</h2>
              <p className="text-black mb-8 font-bold">
                No te quedes fuera del evento de música urbana más esperado. Asegura tu lugar ahora.
              </p>
              <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link href="/tickets">Comprar entradas</Link>
              </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
