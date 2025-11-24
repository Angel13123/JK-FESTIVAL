import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin } from "lucide-react";

export function Location() {
    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto max-w-screen-lg px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold uppercase font-headline mb-4 neon-glow-accent animate-fade-in-up">
                    Ubicación del Festival
                </h2>
                <p className="max-w-2xl mx-auto text-muted-foreground mb-10 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    Martil, Marruecos. El epicentro de la música urbana.
                </p>
                <div className="rounded-lg overflow-hidden border-2 border-accent/50 p-1 md:p-2 shadow-2xl shadow-accent/20 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                     <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12973.833333333334!2d-5.276388888888889!3d35.6175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd746162383a759%3A0x8445a4b3a451e0c3!2sMartil%2C%20Marruecos!5e0!3m2!1ses!2ses!4v1626262626262" 
                        width="100%" 
                        height="450" 
                        style={{ border: 0 }} 
                        allowFullScreen={true}
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Mapa del Festival"
                        className="rounded-md"
                        // This CSS filter creates the dark mode effect for the map
                        css={{ filter: 'invert(90%) hue-rotate(180deg) contrast(1.2)' }}
                    ></iframe>
                </div>
                 <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                    <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10 hover:border-accent hover:text-accent transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_hsl(var(--accent))]">
                        <Link href="/info#location">
                            <MapPin className="mr-2 h-4 w-4" />
                            Cómo llegar
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

// Extend React's CSSProperties to accept our custom filter
declare module 'react' {
  interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
    css?: CSSProperties;
  }
}
