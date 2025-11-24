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
    <>
      <Navbar />
      <main>
        <Hero />
        <LineupPreview />
        <Location />
        <Sponsors />
        <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto max-w-screen-md px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">¿Listo para la experiencia?</h2>
              <p className="text-muted-foreground mb-8">
                No te quedes fuera del evento de música urbana más esperado. Asegura tu lugar ahora.
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full shadow-lg transition-transform duration-300 hover:scale-105">
                  <Link href="/tickets">Comprar entradas</Link>
              </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
