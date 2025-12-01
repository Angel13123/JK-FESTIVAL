

"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { findUnclaimedTicketByCode, claimTicket } from "@/lib/orders-service";
import type { Ticket } from "@/lib/types";
import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { ScanLine, CaseUpper, Loader2, Video } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";


const manualCodeSchema = z.object({
  code: z.string().min(1, "El código no puede estar vacío."),
});
const claimSchema = z.object({
  attendeeName: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
});

export default function AddTicketPage() {
  const { user } = useApp();
  const { toast } = useToast();
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);
  const [ticketToClaim, setTicketToClaim] = useState<Ticket | null>(null);
  const [isClaimDialogOpen, setIsClaimDialogOpen] = useState(false);
  
  const [isScannerActive, setIsScannerActive] = useState(false);
  const scannerRegionRef = useRef<HTMLDivElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(true);

  const manualForm = useForm<z.infer<typeof manualCodeSchema>>({
    resolver: zodResolver(manualCodeSchema),
    defaultValues: { code: "" },
  });

  const claimForm = useForm<z.infer<typeof claimSchema>>({
    resolver: zodResolver(claimSchema),
    defaultValues: { attendeeName: user?.username || "" },
  });

  const processTicketCode = async (code: string) => {
    setIsLoading(true);
    try {
      const ticket = await findUnclaimedTicketByCode(code);
      if (ticket) {
        setTicketToClaim(ticket);
        claimForm.setValue('attendeeName', user?.username || '');
        setIsClaimDialogOpen(true);
      } else {
        toast({
          variant: "destructive",
          title: "Boleto no válido o ya reclamado",
          description: "El código introducido no se corresponde con un boleto válido o ya ha sido añadido a otra cuenta.",
        });
      }
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Error", description: "No se pudo verificar el boleto." });
    } finally {
      setIsLoading(false);
    }
  };

  const onManualSubmit = async (values: z.infer<typeof manualCodeSchema>) => {
    await processTicketCode(values.code);
  };
  
  const onClaimSubmit = async (values: z.infer<typeof claimSchema>) => {
    if (!ticketToClaim || !user) return;
    
    setIsLoading(true);
    try {
      await claimTicket(ticketToClaim.id, values.attendeeName, user.email);
      toast({
        title: "¡Boleto reclamado!",
        description: "El boleto ha sido añadido a tu cartera.",
      });
      setIsClaimDialogOpen(false);
      setTicketToClaim(null);
      router.push("/mobileapp/tickets");
    } catch (error) {
       console.error(error);
       toast({ variant: "destructive", title: "Error", description: "No se pudo reclamar el boleto." });
    } finally {
       setIsLoading(false);
    }
  };

  // --- Scanner Logic ---
  useEffect(() => {
    if (!isScannerActive || !scannerRegionRef.current) return;

    const html5QrCode = new Html5Qrcode(scannerRegionRef.current.id);
    let scannerRunning = true;

    const startScanner = async () => {
        try {
            await Html5Qrcode.getCameras();
            setHasCameraPermission(true);

            if (html5QrCode.getState() === Html5QrcodeScannerState.SCANNING) return;

            html5QrCode.start(
                { facingMode: "environment" },
                { fps: 10, qrbox: { width: 250, height: 250 } },
                (decodedText) => {
                    if (scannerRunning) {
                        setIsScannerActive(false);
                        processTicketCode(decodedText);
                    }
                },
                (errorMessage) => {}
            ).catch(err => {
                setHasCameraPermission(false);
            });
        } catch (err) {
            setHasCameraPermission(false);
        }
    };

    const stopScanner = () => {
        scannerRunning = false;
        if (html5QrCode && html5QrCode.isScanning) {
            html5QrCode.stop().catch(err => console.error("Error stopping scanner:", err));
        }
    };
    
    startScanner();
    return () => stopScanner();
  }, [isScannerActive]);


  return (
    <>
      <div className="space-y-8 animate-fade-in-up">
        <h1 className="text-3xl font-bold text-yellow-400 mb-8 text-center">Añadir Boleto</h1>
      
        <Card className="bg-gray-900 border-gray-800 text-white">
            <CardHeader>
                <CardTitle>Escanear Boleto Físico</CardTitle>
                <CardDescription>Usa la cámara de tu teléfono para digitalizar un boleto.</CardDescription>
            </CardHeader>
            <CardContent>
                {!isScannerActive ? (
                    <Button onClick={() => setIsScannerActive(true)} className="w-full bg-yellow-400 text-black hover:bg-yellow-500" size="lg">
                        <ScanLine className="mr-2 h-5 w-5"/> Abrir Cámara
                    </Button>
                ) : (
                    <div className='space-y-4'>
                        <div id="qr-scanner-region" ref={scannerRegionRef} className="w-full rounded-md border bg-gray-800" />
                        {!hasCameraPermission && (
                            <Alert variant="destructive">
                                <Video className="h-4 w-4" />
                                <AlertTitle>Acceso a la cámara denegado</AlertTitle>
                                <AlertDescription>
                                    Por favor, permite el acceso a la cámara en los ajustes de tu navegador para usar el escáner.
                                </AlertDescription>
                            </Alert>
                        )}
                        <Button onClick={() => setIsScannerActive(false)} variant="secondary" className='w-full'>Cancelar</Button>
                    </div>
                )}
            </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800 text-white">
            <CardHeader>
                <CardTitle>Código Alfanumérico</CardTitle>
                <CardDescription>Introduce el código impreso en tu boleto físico para añadirlo a tu cuenta.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...manualForm}>
                    <form onSubmit={manualForm.handleSubmit(onManualSubmit)} className="space-y-4">
                        <FormField
                            control={manualForm.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Código del Boleto</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej: JK24FEST9B" {...field} className="bg-gray-800 border-gray-700 text-white uppercase"/>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                           {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <CaseUpper className="mr-2 h-5 w-5"/>} Reclamar Boleto
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
      </div>
      
      {/* Dialog for claiming the ticket */}
      <AlertDialog open={isClaimDialogOpen} onOpenChange={setIsClaimDialogOpen}>
          <AlertDialogContent>
              <AlertDialogHeader>
                  <AlertDialogTitle>¡Boleto Válido!</AlertDialogTitle>
                  <AlertDialogDescription>Este boleto es válido. Introduce el nombre del asistente para personalizarlo y añadirlo a tu cartera.</AlertDialogDescription>
              </AlertDialogHeader>
              <Form {...claimForm}>
                  <form onSubmit={claimForm.handleSubmit(onClaimSubmit)} className="space-y-4">
                      <FormField
                          control={claimForm.control}
                          name="attendeeName"
                          render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Nombre del Asistente</FormLabel>
                                  <FormControl><Input placeholder="Nombre completo" {...field} /></FormControl>
                                  <FormMessage />
                              </FormItem>
                          )}
                      />
                      <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                            Confirmar y Añadir
                          </AlertDialogAction>
                      </AlertDialogFooter>
                  </form>
              </Form>
          </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
