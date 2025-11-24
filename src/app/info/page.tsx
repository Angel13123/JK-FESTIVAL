import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Car, Bus, Clock, Accessibility } from "lucide-react";

export default function InfoPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-screen-lg px-4 py-16">
        <div className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">Información Práctica</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Todo lo que necesitas saber para disfrutar del JK Festival sin preocupaciones.
          </p>
        </div>

        <div className="space-y-12">
          <Card id="location" className="transition-shadow duration-300 hover:shadow-lg scroll-mt-20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" />Ubicación</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                El festival se celebra en la espectacular costa de <strong>Martil, Marruecos</strong>. Una localización única junto al mar para una experiencia inolvidable.
              </p>
              <div className="mt-4 rounded-lg overflow-hidden border aspect-video">
                 <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12973.833333333334!2d-5.276388888888889!3d35.6175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd746162383a759%3A0x8445a4b3a451e0c3!2sMartil%2C%20Marruecos!5e0!3m2!1ses!2ses!4v1626262626262" 
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
            <Card className="transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1 transform">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5 text-primary" />Horarios</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-muted-foreground">
                <p><strong>Apertura de puertas:</strong> 16:00</p>
                <p><strong>Inicio de conciertos:</strong> 17:00</p>
                <p><strong>Fin de conciertos:</strong> 02:00</p>
                <p><strong>Cierre del recinto:</strong> 03:00</p>
              </CardContent>
            </Card>
             <Card className="transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1 transform">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Accessibility className="h-5 w-5 text-primary" />Accesibilidad</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">El recinto está adaptado para personas con movilidad reducida, incluyendo rampas de acceso y zonas reservadas con buena visibilidad.</p>
              </CardContent>
            </Card>
          </div>

          <Card id="how-to-get-there" className="transition-shadow duration-300 hover:shadow-lg scroll-mt-20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bus className="h-5 w-5 text-primary" />Cómo Llegar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <div>
                    <h3 className="font-semibold text-foreground flex items-center gap-2"><Car className="h-4 w-4"/>En Coche</h3>
                    <p>Habrá un parking habilitado cerca del recinto. Se recomienda compartir coche y llegar con antelación.</p>
                </div>
                 <div>
                    <h3 className="font-semibold text-foreground flex items-center gap-2"><Bus className="h-4 w-4"/>Transporte Público</h3>
                    <p>Se reforzarán las líneas de autobús desde Tetuán y otras ciudades cercanas. Consulta los horarios especiales que se publicarán próximamente.</p>
                </div>
            </CardContent>
          </Card>
          
        </div>
      </div>
    </div>
  );
}
