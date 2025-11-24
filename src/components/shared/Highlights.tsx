import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Music, Star, MapPin } from "lucide-react";

const highlights = [
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Ambiente Único",
    description: "Vibra con miles de fans y una energía que solo encontrarás aquí.",
  },
  {
    icon: <Music className="h-8 w-8 text-primary" />,
    title: "Artistas Top",
    description: "Disfruta de los nombres más grandes y emergentes de la escena urbana.",
  },
  {
    icon: <Star className="h-8 w-8 text-primary" />,
    title: "Experiencia Completa",
    description: "Más que música: arte, food trucks y zonas de descanso para una jornada inolvidable.",
  },
  {
    icon: <MapPin className="h-8 w-8 text-primary" />,
    title: "Ubicación Mágica",
    description: "Vive el festival en Martil, un entorno costero con un encanto especial.",
  },
];

export function Highlights() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold uppercase font-headline mb-4 neon-glow-accent">Puntos Clave</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {highlights.map((highlight, index) => (
            <Card 
              key={index} 
              className="text-center bg-black/20 backdrop-blur-sm border border-accent/20 transition-all duration-300 ease-out hover:border-accent/80 hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-2 animate-breathing"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="items-center">
                <div className="bg-accent/10 p-4 rounded-full border border-accent/20">
                  {highlight.icon}
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl uppercase font-headline mb-2 text-white">{highlight.title}</CardTitle>
                <p className="text-muted-foreground text-sm">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
