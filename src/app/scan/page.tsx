"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { validateTicket, markTicketAsUsed } from "@/lib/orders-service";
import type { Ticket as TicketType } from "@/lib/types";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Timestamp } from "firebase/firestore";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Ticket, CheckCircle, XCircle, AlertCircle, User, Calendar, QrCode, ArrowLeft } from "lucide-react";

const formSchema = z.object({
  ticketCode: z.string().min(5, "El código de entrada es demasiado corto."),
});

type ValidationStatus = "idle" | "valid" | "used" | "not_found" | "activated";
interface ValidationResult {
    status: ValidationStatus;
    message: string;
    ticket?: TicketType;
}

function ResultCard({ result, onActivate }: { result: ValidationResult, onActivate: () => void }) {
    if (result.status === 'idle') {
        return null;
    }

    const baseClasses = "mt-8 text-center p-6 border-l-4 rounded-r-lg w-full max-w-md";
    const statusConfig = {
        valid: {
            icon: <CheckCircle className="h-12 w-12 text-green-500" />,
            title: "Entrada Válida",
            cardClass: "bg-green-50/50 border-green-500",
        },
        activated: {
            icon: <CheckCircle className="h-12 w-12 text-green-500" />,
            title: "Entrada Activada",
            cardClass: "bg-green-50/50 border-green-500",
        },
        used: {
            icon: <AlertCircle className="h-12 w-12 text-yellow-500" />,
            title: "Entrada Ya Utilizada",
            cardClass: "bg-yellow-50/50 border-yellow-500",
        },
        not_found: {
            icon: <XCircle className="h-12 w-12 text-red-500" />,
            title: "Entrada No Encontrada",
            cardClass: "bg-red-50/50 border-red-500",
        },
        idle: {
            icon: null,
            title: "",
            cardClass: ""
        }
    };

    const config = statusConfig[result.status];

    const getJsDateFromTimestamp = (timestamp: any): Date | null => {
        if (timestamp instanceof Timestamp) {
            return timestamp.toDate();
        }
        if (typeof timestamp === 'string') {
            const date = new Date(timestamp);
            if (!isNaN(date.getTime())) {
                return date;
            }
        }
         if(timestamp && typeof timestamp.seconds === 'number') {
            return new Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate();
        }
        return null;
    }
    
    const purchaseDate = result.ticket?.createdAt ? getJsDateFromTimestamp(result.ticket.createdAt) : null;

    return (
        <Card className={`${baseClasses} ${config.cardClass} animate-fade-in-up`}>
            <CardHeader className="items-center space-y-4">
                {config.icon}
                <CardTitle className="text-2xl font-bold">{config.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-muted-foreground">{result.message}</p>
                {result.ticket && (
                    <div className="text-left bg-background p-4 rounded-lg border text-sm space-y-3">
                         <div className="flex items-center gap-3">
                            <User className="h-4 w-4 text-muted-foreground"/>
                            <span><strong>Propietario:</strong> {result.ticket.ownerName}</span>
                         </div>
                         <div className="flex items-center gap-3">
                            <Ticket className="h-4 w-4 text-muted-foreground"/>
                            <span><strong>Tipo:</strong> {result.ticket.ticketTypeName}</span>
                         </div>
                         <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-muted-foreground"/>
                             <span><strong>Comprado:</strong> {purchaseDate ? format(purchaseDate, "d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es }) : 'N/A'}</span>
                         </div>
                    </div>
                )}
                 {result.status === 'valid' && (
                    <Button onClick={onActivate} size="lg" className="w-full mt-4">
                       <CheckCircle className="mr-2 h-5 w-5"/> Activar entrada
                    </Button>
                )}
            </CardContent>
        </Card>
    )
}

export default function ScanPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ValidationResult>({ status: 'idle', message: '' });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ticketCode: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult({ status: 'idle', message: '' });
    await new Promise(resolve => setTimeout(resolve, 500));

    const code = values.ticketCode.toUpperCase();
    const validationResponse = await validateTicket(code);

    setResult(validationResponse);
    setIsLoading(false);
    // No reseteamos el formulario para que el código siga visible
  }

  const handleActivate = async () => {
    if (result.ticket && result.status === 'valid') {
        setIsLoading(true);
        await markTicketAsUsed(result.ticket.id);
        setResult({
            status: 'activated',
            message: `El ticket con código ${result.ticket.code} ha sido activado y marcado como usado.`,
            ticket: { ...result.ticket, status: 'used' }
        });
        setIsLoading(false);
        form.reset();
    }
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-theme(spacing.32))] pt-10 px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold font-headline">Validación de Entradas</h1>
        <p className="text-muted-foreground mt-2">Introduce el código para validar la entrada de un asistente.</p>
      </div>

      <Card className="w-full max-w-md mt-8">
        <CardHeader className="text-center items-center">
          <QrCode className="h-8 w-8 text-primary" />
          <CardTitle className="font-headline text-2xl">Escanear Código</CardTitle>
          <CardDescription>Introduce el código manualmente.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="ticketCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código de Entrada</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: JK24FEST9B" {...field} autoFocus className="font-mono text-center text-lg tracking-widest" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full transition-transform hover:scale-105" size="lg" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Ticket className="mr-2 h-4 w-4" />}
                Validar entrada
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {result.status !== 'idle' && <ResultCard result={result} onActivate={handleActivate} />}

      <div className="mt-8">
        <Button variant="outline" asChild>
          <Link href="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Admin
          </Link>
        </Button>
      </div>
    </div>
  );
}
