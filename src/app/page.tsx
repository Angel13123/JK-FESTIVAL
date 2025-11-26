
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function V1LaunchPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center text-center p-4 overflow-hidden">
      {/* Background Image */}
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover z-0"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center gap-6 animate-fade-in-down">
        {/* Big Festival Logo */}
        <h1
          className="text-6xl sm:text-8xl md:text-9xl font-headline uppercase"
          style={{
            color: 'hsl(var(--primary))',
            WebkitTextStroke: '3px black',
            textShadow: '8px 8px 0px #000000',
          }}
        >
          JK Festival
        </h1>

        {/* Main Headline */}
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-headline uppercase"
          style={{
            color: 'hsl(var(--primary))',
            WebkitTextStroke: '2px black',
            textShadow: '4px 4px 0px #000000',
          }}
        >
          ¡EL FESTIVAL ESTÁ EN CAMINO!
        </h2>

        {/* Secondary Message */}
        <p className="text-lg sm:text-xl md:text-2xl text-white font-bold" style={{ textShadow: '2px 2px 4px #000' }}>
          Prepara tus sentidos. Una experiencia única se acerca.
        </p>

        {/* App Announcement */}
        <div className="mt-8 space-y-2">
          <p className="text-md sm:text-lg text-white font-bold" style={{ textShadow: '2px 2px 4px #000' }}>
            La APP OFICIAL para Android & iOS está en desarrollo.
          </p>
          <p 
            className="text-xl sm:text-2xl font-bold uppercase"
            style={{
                color: 'hsl(var(--primary))',
                textShadow: '3px 3px 0px #000'
            }}
          >
            ¡Lanzamiento muy pronto! Mantente atento.
          </p>
        </div>
      </div>
    </div>
  );
}
