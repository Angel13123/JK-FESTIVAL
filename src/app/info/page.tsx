

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Car, Bus, Clock, Accessibility } from "lucide-react";

export default function InfoPage() {
  return (
    <div className="bg-transparent">
      <div className="container mx-auto max-w-screen-lg px-4 py-16">
        <div className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl tracking-tight">Información Práctica</h1>
          <p className="mt-4 text-lg text-black font-bold">
            Todo lo que necesitas saber para disfrutar del JK Festival sin preocupaciones.
          </p>
        </div>

        <div className="space-y-12">
          <Card id="location" className="transition-shadow duration-300 hover:shadow-lg scroll-mt-20 animate-fade-in-up bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" />Ubicación</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-black font-bold">
                El festival se celebra en la espectacular costa de <strong>Martil, Marruecos</strong>, en el icónico <strong>Grand Stade de Martil</strong>. Una localización única junto al mar para una experiencia inolvidable.
              </p>
              <div className="mt-4 rounded-lg overflow-hidden border aspect-video">
                 <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3243.511364491758!2d-5.281898188849419!3d35.61499583406323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7461b17316e6ab%3A0x82a5b0b461c94543!2sStade%20de%20Martil!5e0!3m2!1ses!2ses!4v1700000000000"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa del Festival"
                ></iframe>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="animate-fade-in-up" style={{ animationDelay: '100ms'}}>
              <Card className="transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1 transform h-full bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5 text-primary" />Horarios</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-black font-bold">
                  <p><strong>Apertura de puertas:</strong> 16:00</p>
                  <p><strong>Inicio de conciertos:</strong> 17:00</p>
                  <p><strong>Fin de conciertos:</strong> 02:00</p>
                  <p><strong>Cierre del recinto:</strong> 03:00</p>
                </CardContent>
              </Card>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '200ms'}}>
               <Card className="transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1 transform h-full bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Accessibility className="h-5 w-5 text-primary" />Accesibilidad</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-black font-bold">El recinto está adaptado para personas con movilidad reducida, incluyendo rampas de acceso y zonas reservadas con buena visibilidad.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card id="how-to-get-there" className="transition-shadow duration-300 hover:shadow-lg scroll-mt-20 animate-fade-in-up bg-card" style={{ animationDelay: '300ms'}}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bus className="h-5 w-5 text-primary" />Cómo Llegar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="font-bold text-lg text-black flex items-center gap-2" style={{textShadow: 'none'}}><Car className="h-4 w-4"/>En Coche</h3>
                    <p className="text-black font-bold">Habrá un parking habilitado cerca del recinto. Se recomienda compartir coche y llegar con antelación.</p>
                </div>
                 <div>
                    <h3 className="font-bold text-lg text-black flex items-center gap-2" style={{textShadow: 'none'}}><Bus className="h-4 w-4"/>Transporte Público</h3>
                    <p className="text-black font-bold">Se reforzarán las líneas de autobús desde Tetuán y otras ciudades cercanas. Consulta los horarios especiales que se publicarán próximamente.</p>
                </div>
            </CardContent>
          </Card>
          
        </div>
      </div>
    </div>
  );
}
