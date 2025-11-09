"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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

// Mock database of tickets
const mockTicketDatabase = {
  "VALID-123": { used: false, owner: "Juan Pérez" },
  "USED-456": { used: true, owner: "Ana García" },
  "VALID-789": { used: false, owner: "Carlos López" },
};

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

    // TODO: In a real app, this would be an API call to a database.
    // It would also ideally use a camera to scan a QR code.
    await new Promise(resolve => setTimeout(resolve, 1000));

    const code = values.ticketCode.toUpperCase();
    const ticket = mockTicketDatabase[code as keyof typeof mockTicketDatabase];

    if (ticket) {
      if (ticket.used) {
        setResult({status: 'used', message: `Entrada ya utilizada. Propietario: ${ticket.owner}.`});
      } else {
        setResult({status: 'valid', message: `Entrada válida. Propietario: ${ticket.owner}.`});
        // Mock updating the database
        ticket.used = true;
      }
    } else {
      setResult({status: 'not_found', message: 'Entrada no encontrada en la base de datos.'});
    }

    setIsLoading(false);
    form.reset();
  }

  const getAlertVariant = (status: ValidationStatus) => {
    switch (status) {
      case 'valid': return 'default';
      case 'used': return 'destructive';
      case 'not_found': return 'destructive';
      default: return 'default';
    }
  };
  
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
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center items-center">
            <Music className="h-8 w-8 text-primary" />
            <CardTitle className="font-headline text-2xl">Validación de Entradas</CardTitle>
            <CardDescription>Introduce el código para validar la entrada.</CardDescription>
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
                        <Input placeholder="Ej: VALID-123" {...field} autoFocus />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Ticket className="mr-2 h-4 w-4"/>}
                  Validar entrada
                </Button>
              </form>
            </Form>
            
            <p className="text-xs text-center text-muted-foreground mt-4">
              // TODO: Integrar lector de códigos QR.
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
  );
}
