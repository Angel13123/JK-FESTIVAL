import Link from "next/link";
import Image from "next/image";
import { artists } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function LineupPreview() {
  const featuredArtists = artists.slice(0, 4);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-screen-xl px-4 text-center">
        <h2 className="text-primary text-5xl md:text-6xl mb-4">Lineup JK Festival</h2>
        <p className="max-w-2xl mx-auto text-black font-bold mb-10">
          Los talentos de JK Festival que haran vibrar Martil.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {featuredArtists.map((artist, index) => (
            <div key={artist.id}>
              <Card 
                className="overflow-hidden group transition-all duration-300 ease-out hover:-translate-y-2 transform bg-white"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square border-b-4 border-black">
                    <Image
                      src={artist.imageUrl}
                      alt={`Foto de ${artist.name}`}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      data-ai-hint="artist portrait"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-3xl text-primary">{artist.name}</h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Button asChild variant="secondary" size="lg" className="text-lg">
            <Link href="/lineup">
              Ver cartel completo <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
