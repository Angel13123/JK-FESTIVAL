import Link from "next/link";
import Image from "next/image";
import { artists } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function LineupPreview() {
  const featuredArtists = artists.slice(0, 4);

  return (
    <section className="py-16 md:py-24 bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto max-w-screen-xl px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold uppercase font-headline mb-4 neon-glow-primary">Lineup Golden Epiphany</h2>
        <p className="max-w-2xl mx-auto text-muted-foreground mb-10">
          Los talentos de Golden Epiphany que harán vibrar Martil.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredArtists.map((artist, index) => (
            <Card key={artist.id} 
              className="overflow-hidden group transition-all duration-300 ease-out hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2 transform bg-black/20 backdrop-blur-sm border border-primary/20 animate-breathing hover:border-primary/80"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <Image
                    src={artist.imageUrl}
                    alt={`Foto de ${artist.name}`}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    data-ai-hint="artist portrait"
                  />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold uppercase font-headline text-white">{artist.name}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12">
          <Button asChild variant="outline" size="lg" className="transition-transform duration-300 hover:scale-105 border-secondary text-secondary hover:bg-secondary/10 hover:border-secondary hover:text-secondary">
            <Link href="/lineup">
              Ver cartel completo <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
