
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ScanLine, CaseUpper } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  code: z.string().min(1, "El código no puede estar vacío."),
});

export default function AddTicketPage() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { code: "" },
    });

    const onManualSubmit = (values: z.infer<typeof formSchema>) => {
        // Placeholder for claim logic
        toast({
            title: "Función no implementada",
            description: `La lógica para reclamar el boleto ${values.code} aún no está conectada.`,
        });
        console.log("Claiming ticket with code:", values.code);
    }
  return (
    <div className="space-y-8 animate-fade-in-up">
        <h1 className="text-3xl font-bold text-yellow-400 mb-8 text-center">Añadir Boleto</h1>
      
        <Card className="bg-gray-900 border-gray-800 text-white">
            <CardHeader>
                <CardTitle>Escanear Boleto Físico</CardTitle>
                <CardDescription>Usa la cámara de tu teléfono para digitalizar un boleto.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500" size="lg">
                    <ScanLine className="mr-2 h-5 w-5"/>
                    Abrir Cámara
                </Button>
                 <p className="text-xs text-gray-500 mt-2 text-center">Placeholder para la lógica de la cámara.</p>
            </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800 text-white">
            <CardHeader>
                <CardTitle>Código Alfanumérico</CardTitle>
                <CardDescription>Introduce el código impreso en tu boleto físico para añadirlo a tu cuenta.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onManualSubmit)} className="space-y-4">
                        <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Código del Boleto</FormLabel>
                            <FormControl>
                                <Input placeholder="Ej: JK24FEST9B" {...field} className="bg-gray-800 border-gray-700 text-white"/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className="w-full">
                           <CaseUpper className="mr-2 h-5 w-5"/> Reclamar Boleto
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  );
}
