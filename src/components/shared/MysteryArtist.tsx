

export function MysteryArtist() {
  return (
    <section className="py-16 md:py-24 bg-transparent">
      <div className="container mx-auto max-w-screen-lg px-4 text-center flex flex-col items-center gap-8">
        {/* Mini Logo */}
        <div>
          <h2 
            className="text-4xl font-headline text-primary"
            style={{
              WebkitTextStroke: '2px black',
              textShadow: '4px 4px 0px #000000',
            }}
          >
            JK Festival
          </h2>
          <p className="text-lg font-extrabold text-white uppercase tracking-wider -mt-1" style={{ WebkitTextStroke: '1px black' }}>
            GRAND STADE DE MARTIL
          </p>
        </div>

        {/* Main Text */}
        <h3 
          className="text-6xl md:text-8xl font-headline uppercase"
          style={{
            color: '#F7FF00',
            WebkitTextStroke: '3px black',
            textShadow: '6px 6px 0px #000000',
          }}
        >
          Muy Pronto<br/>Nuevo Artista
        </h3>

        {/* Bottom Text */}
        <div className="relative">
          <h4
            className="text-5xl md:text-7xl font-headline uppercase animate-float"
            style={{
              color: '#00FFFF',
              WebkitTextStroke: '3px black',
              textShadow: '5px 5px 0px #000000',
              animationDuration: '6s',
              maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
            }}
          >
            SHHHHH...
          </h4>
          <div 
            className="absolute -bottom-10 left-0 right-0 h-24 bg-gradient-to-t from-transparent via-transparent/70 to-transparent"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
