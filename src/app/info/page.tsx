import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Car, Bus, Clock, Wheelchair } from "lucide-radix";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function InfoPage() {
    const mapImage = PlaceHolderImages.find(p => p.id === 'map');

  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-screen-lg px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">Información Práctica</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Todo lo que necesitas saber para disfrutar del JK Festival sin preocupaciones.
          </p>
        </div>

        <div className="space-y-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" />Ubicación</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                El festival se celebra en la espectacular costa de <strong>Martil, Marruecos</strong>. Una localización única junto al mar para una experiencia inolvidable.
              </p>
              <div className="mt-4 rounded-lg overflow-hidden border">
                {mapImage && (
                     <Image
                        src={mapImage.imageUrl}
                        alt={mapImage.description}
                        width={1200}
                        height={800}
                        className="w-full h-auto object-cover"
                        data-ai-hint={mapImage.imageHint}
                    />
                )}
              </div>
               <p className="text-xs text-center text-muted-foreground mt-2">// TODO: Reemplazar con un mapa interactivo embebido (Google Maps, etc.).</p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
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
             <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Wheelchair className="h-5 w-5 text-primary" />Accesibilidad</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">El recinto está adaptado para personas con movilidad reducida, incluyendo rampas de acceso y zonas reservadas con buena visibilidad.</p>
              </CardContent>
            </Card>
          </div>

          <Card>
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
