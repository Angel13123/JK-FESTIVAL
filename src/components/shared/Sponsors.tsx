import Image from 'next/image';
import { sponsors } from '@/lib/data';

export function Sponsors() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto max-w-screen-lg px-4">
        <h3 className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8 animate-fade-in-up">
          Con el apoyo de
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-12">
          {sponsors.map((sponsor, index) => (
            <div 
              key={sponsor.id} 
              className="relative h-12 w-32 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-110 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
            >
              <Image
                src={sponsor.logoUrl}
                alt={sponsor.name}
                fill
                className="object-contain"
                data-ai-hint="company logo"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
