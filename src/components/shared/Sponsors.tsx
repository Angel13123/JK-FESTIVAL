import Image from 'next/image';
import { sponsors } from '@/lib/data';
import { Card, CardContent } from '../ui/card';

export function Sponsors() {
  return (
    <section className="py-16 md:py-24 bg-transparent">
      <div className="container mx-auto max-w-screen-lg px-4">
        <h2 className="text-center text-5xl md:text-6xl mb-12">
          Con el apoyo de
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {sponsors.map((sponsor, index) => (
             <Card 
                key={sponsor.id} 
                className="bg-white transition-transform duration-300 ease-out hover:-translate-y-1"
            >
                <CardContent className="p-4 flex justify-center items-center aspect-video">
                     <div 
                        className="relative h-12 w-32 transition-all duration-300 ease-out hover:scale-110"
                        >
                        <Image
                            src={sponsor.logoUrl}
                            alt={sponsor.name}
                            fill
                            className="object-contain"
                            data-ai-hint="company logo"
                        />
                    </div>
                </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
