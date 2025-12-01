"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Twitter, Instagram, Facebook } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio."),
  email: z.string().email("Por favor, introduce un email válido."),
  subject: z.string().min(5, "El asunto debe tener al menos 5 caracteres."),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSuccess(true);
    // TODO: Connect to a real backend to send the email/message.
  }
  
  if (isSuccess) {
    return (
        <div className="container mx-auto max-w-screen-md px-4 py-16 flex items-center justify-center min-h-[60vh]">
            <div className="text-center animate-fade-in-down">
                <h1 className="text-3xl">¡Mensaje enviado!</h1>
                <p className="mt-4 text-muted-foreground">Gracias por contactarnos. Te responderemos lo antes posible.</p>
                <Button onClick={() => { setIsSuccess(false); form.reset(); }} className="mt-8 transition-transform duration-300 hover:scale-105">Enviar otro mensaje</Button>
            </div>
        </div>
    );
  }

  return (
    <div className="bg-transparent">
      <div className="container mx-auto max-w-screen-lg px-4 py-16">
        <div className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl tracking-tight">Contacto</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            ¿Preguntas, sugerencias o propuestas? Estamos aquí para escucharte.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
            <Card className="transition-shadow duration-300 hover:shadow-xl bg-card">
                <CardHeader>
                    <CardTitle>Envíanos un mensaje</CardTitle>
                    <CardDescription>Rellena el formulario y nos pondremos en contacto contigo.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl><Input placeholder="Tu nombre" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl><Input type="email" placeholder="tu@email.com" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="subject" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Asunto</FormLabel>
                                <FormControl><Input placeholder="Motivo de tu consulta" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                         <FormField control={form.control} name="message" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mensaje</FormLabel>
                                <FormControl><Textarea placeholder="Escribe aquí tu mensaje..." {...field} className="min-h-[120px]" /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <Button type="submit" disabled={isLoading} className="w-full transition-transform duration-300 hover:scale-105">
                           {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                           Enviar mensaje
                        </Button>
                      </form>
                    </Form>
                </CardContent>
            </Card>
            <div className="space-y-8 flex flex-col justify-center">
                <div>
                    <h3 className="text-xl font-semibold font-headline">Información General</h3>
                    <p className="text-muted-foreground mt-2">Para dudas sobre entradas, horarios o el festival en general.</p>
                    <a href="mailto:info@jkfestival.com" className="text-primary font-semibold hover:underline">info@jkfestival.com</a>
                </div>
                <div>
                    <h3 className="text-xl font-semibold font-headline">Prensa y Medios</h3>
                    <p className="text-muted-foreground mt-2">Para acreditaciones y material de prensa.</p>
                    <a href="mailto:prensa@jkfestival.com" className="text-primary font-semibold hover:underline">prensa@jkfestival.com</a>
                </div>
                 <div>
                    <h3 className="text-xl font-semibold font-headline">Síguenos en Redes</h3>
                    <p className="text-muted-foreground mt-2">No te pierdas ninguna novedad.</p>
                    <div className="flex items-center gap-4 mt-4">
                        <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter className="h-6 w-6 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125" /></Link>
                        <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram className="h-6 w-6 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125" /></Link>
                        <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook className="h-6 w-6 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125" /></Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
