import Link from "next/link";
import { Music, Twitter, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto max-w-screen-2xl px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 font-bold text-lg font-headline">
            <Music className="h-6 w-6 text-primary" />
            <span>JK Festival</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link href="/legal/terms" className="hover:text-primary transition-colors">
              Términos de servicio
            </Link>
            <Link href="/legal/privacy" className="hover:text-primary transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/legal/cookies" className="hover:text-primary transition-colors">
              Política de Cookies
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contacto
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="#" aria-label="Facebook">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} JK Festival. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
