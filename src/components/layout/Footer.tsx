import Link from "next/link";
import { Music, Twitter, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t-4 border-black bg-accent p-4">
      <div className="container mx-auto max-w-screen-2xl px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
             <Music className="h-8 w-8 text-black" />
             <span className="text-3xl font-headline text-primary">JK Festival</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-black font-bold">
            <Link href="/legal/terms" className="hover:text-primary transition-colors">
              Términos
            </Link>
            <Link href="/legal/privacy" className="hover:text-primary transition-colors">
              Privacidad
            </Link>
            <Link href="/legal/cookies" className="hover:text-primary transition-colors">
              Cookies
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contacto
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-6 w-6 text-black hover:text-primary transition-colors" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-6 w-6 text-black hover:text-primary transition-colors" />
            </Link>
            <Link href="#" aria-label="Facebook">
              <Facebook className="h-6 w-6 text-black hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-black font-bold">
          &copy; {new Date().getFullYear()} JK Festival. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
