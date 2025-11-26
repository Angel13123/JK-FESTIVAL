import Link from "next/link";

export function FlashNews() {
  return (
    <section className="relative py-12 md:py-20">
      <div className="relative container mx-auto max-w-screen-lg px-4 text-center">
        <h2 
          className="text-5xl md:text-7xl lg:text-8xl font-headline uppercase"
          style={{
            color: '#F7FF00',
            WebkitTextStroke: '3px black',
            textShadow: '6px 6px 0px #000000',
          }}
        >
          Entradas Próximamente<br/>en la Web
        </h2>
        <h3 
          className="text-2xl md:text-4xl font-extrabold text-white uppercase tracking-wider mt-6"
           style={{
            WebkitTextStroke: '2px black',
          }}
        >
          Pero ya puedes conseguir la tuya
        </h3>
        <p 
          className="text-xl md:text-2xl font-headline mt-6 uppercase"
           style={{
            color: '#F7FF00',
            WebkitTextStroke: '2px black',
            textShadow: '4px 4px 0px #000000',
          }}
        >
          <Link href="/tickets">
            Conoce los beneficios de cada entrada
          </Link>
        </p>
      </div>
    </section>
  );
}
