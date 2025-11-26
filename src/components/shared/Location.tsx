"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download, MapPin } from "lucide-react";
import { PwaInstallButton } from "./PwaInstallButton";

export function Location() {
    return (
        <section className="py-16 md:py-24 bg-transparent">
            <div className="container mx-auto max-w-screen-lg px-4 text-center">
                <h2 className="text-5xl md:text-6xl mb-4">
                    Martil, Marruecos
                </h2>
                <p className="max-w-2xl mx-auto text-black font-bold mb-10">
                    El epicentro de la música urbana.
                </p>
                <div className="rounded-xl overflow-hidden border-[3px] border-black hard-shadow p-1 md:p-2">
                     <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3243.511364491758!2d-5.281898188849419!3d35.61499583406323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7461b17316e6ab%3A0x82a5b0b461c94543!2sStade%20de%20Martil!5e0!3m2!1ses!2ses!4v1700000000000"
                        width="100%" 
                        height="450" 
                        style={{ border: 0 }} 
                        allowFullScreen={true}
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Mapa del Festival"
                        className="rounded-md"
                    ></iframe>
                </div>
                 <div className="mt-12">
                    <Button asChild size="lg" variant="secondary">
                        <Link href="/info#location">
                            <MapPin className="mr-2 h-4 w-4" />
                            Cómo llegar
                        </Link>
                    </Button>
                </div>
                 <div className="mt-10 border-t-4 border-dashed border-black pt-10">
                    <div className="bg-white p-8 md:p-10 rounded-xl border-4 border-black shadow-[8px_8px_0px_#000000] mb-16">
                        <h3 className="text-3xl text-primary">Lleva el festival en tu bolsillo</h3>
                        <p className="text-black font-bold mt-2 mb-6 max-w-xl mx-auto text-lg">
                            Instala nuestra aplicación web para un acceso rápido a tus entradas, horarios y mapa del sitio, ¡incluso sin conexión!
                        </p>
                        <PwaInstallButton style={{ backgroundColor: 'hsl(var(--accent))' }} size="lg">
                            <Download className="mr-2 h-4 w-4" />
                            Instalar aplicación
                        </PwaInstallButton>
                    </div>
                </div>
            </div>
        </section>
    );
}
