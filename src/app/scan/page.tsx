"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { validateTicket, markTicketAsUsed } from "@/lib/orders-service";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Ticket, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Music } from "lucide-react";


const formSchema = z.object({
  ticketCode: z.string().min(5, "El código de entrada es demasiado corto."),
});

type ValidationStatus = "idle" | "valid" | "used" | "not_found";
interface ValidationResult {
    status: ValidationStatus;
    message: string;
}

export default function ScanPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ValidationResult>({status: 'idle', message: ''});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ticketCode: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult({status: 'idle', message: ''});

    // In a real app, this would be an API call to a database.
    // For now, we interact with our in-memory service.
    await new Promise(resolve => setTimeout(resolve, 1000));

    const code = values.ticketCode.toUpperCase();
    const validationResponse = validateTicket(code);

    if (validationResponse.status === 'valid' && validationResponse.ticket) {
      markTicketAsUsed(validationResponse.ticket.id);
      setResult({status: 'valid', message: `Entrada válida. Propietario: ${validationResponse.ticket.ownerName}.`});
    } else {
      setResult({status: validationResponse.status, message: validationResponse.message});
    }

    setIsLoading(false);
    form.reset();
  }
  
  const ResultIcon = () => {
    switch(result.status){
        case 'valid': return <CheckCircle className="h-4 w-4"/>
        case 'used': return <AlertCircle className="h-4 w-4"/>
        case 'not_found': return <XCircle className="h-4 w-4"/>
        default: return null
    }
  };
  
   const getAlertClass = (status: ValidationStatus) => {
    switch(status) {
        case 'valid': return 'bg-green-100 border-green-400 text-green-800 dark:bg-green-900/50 dark:border-green-700 dark:text-green-300 [&>svg]:text-green-600';
        case 'used': return 'bg-yellow-100 border-yellow-400 text-yellow-800 dark:bg-yellow-900/50 dark:border-yellow-700 dark:text-yellow-300 [&>svg]:text-yellow-600';
        case 'not_found': return 'bg-red-100 border-red-400 text-red-800 dark:bg-red-900/50 dark:border-red-700 dark:text-red-300 [&>svg]:text-red-600';
        default: return 'hidden';
    }
  }

  return (
    <>
       <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Validación de Entradas</h1>
          <p className="text-muted-foreground">Introduce el código para validar la entrada de un asistente.</p>
        </div>
      </div>
      <div className="flex items-center justify-center animate-fade-in-up">
        <Card className="w-full max-w-md">
            <CardHeader className="text-center items-center">
                <Music className="h-8 w-8 text-primary" />
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
                            <Input placeholder="Ej: JKF-XXXX-XXXX" {...field} autoFocus className="font-mono text-center"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full transition-transform hover:scale-105" size="lg" disabled={isLoading}>
                      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Ticket className="mr-2 h-4 w-4"/>}
                      Validar entrada
                    </Button>
                  </form>
                </Form>
                
                <p className="text-xs text-center text-muted-foreground mt-4">
                  En el futuro, se integrará un lector de códigos QR.
                </p>

                {result.status !== 'idle' && (
                  <Alert className={`mt-6 ${getAlertClass(result.status)}`}>
                      <ResultIcon />
                      <AlertTitle className="font-bold">
                          {result.status === 'valid' && 'Entrada Válida'}
                          {result.status === 'used' && 'Entrada Ya Utilizada'}
                          {result.status === 'not_found' && 'Entrada No Encontrada'}
                      </AlertTitle>
                      <AlertDescription>
                        {result.message}
                      </AlertDescription>
                  </Alert>
                )}
            </CardContent>
          </Card>
      </div>
    </>
  );
}
