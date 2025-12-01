
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCollection } from "@/firebase/firestore/use-collection";
import { collection, query, where, getFirestore } from "firebase/firestore";
import { initializeFirebase, useMemoFirebase } from "@/firebase";
import type { Ticket } from "@/lib/types";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PlusCircle, Eye, Download, Loader2, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import QRCode from "qrcode.react";
import { createPhysicalTickets, getPhysicalTickets } from "@/lib/orders-service";

const { firestore } = initializeFirebase();

const generationSchema = z.object({
  quantity: z.coerce.number().min(1, "Debe ser al menos 1.").max(100, "No se pueden crear más de 100 a la vez."),
  ticketTypeId: z.string().min(1, "Debe seleccionar un tipo de entrada"),
});

type GenerationFormData = z.infer<typeof generationSchema>;

function QrDialog({ ticketCode }: { ticketCode: string }) {
    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Código QR</DialogTitle>
                <DialogDescription>
                   Escanea este código con la app para digitalizar el boleto.
                </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center p-4">
                <QRCode value={ticketCode} size={256} />
                <p className="mt-4 font-mono font-bold text-lg">{ticketCode}</p>
            </div>
        </DialogContent>
    );
}

function GenerationForm({ onSave, closeDialog }: { onSave: (data: GenerationFormData) => void; closeDialog: () => void }) {
  const form = useForm<GenerationFormData>({
    resolver: zodResolver(generationSchema),
    defaultValues: { quantity: 10, ticketTypeId: "general_physical" },
  });

  function onSubmit(data: GenerationFormData) {
    onSave(data);
    closeDialog();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="quantity" render={({ field }) => (
          <FormItem><FormLabel>Cantidad a Generar</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="ticketTypeId" render={({ field }) => (
          <FormItem><FormLabel>Tipo de Entrada (ID)</FormLabel><FormControl><Input {...field} placeholder="Ej: general_physical" /></FormControl><FormMessage /></FormItem>
        )} />
        <DialogFooter>
          <Button type="submit">Generar</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}


export default function AdminPhysicalTicketsPage() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTicketCode, setSelectedTicketCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Real-time query for physical tickets
  const physicalTicketsQuery = useMemoFirebase(() => query(
    collection(firestore, "tickets"), 
    where("isPhysical", "==", true)
  ), [firestore]);

  const { data: tickets, isLoading: isLoadingTickets } = useCollection<Ticket>(physicalTicketsQuery);

  const handleGenerate = async (data: GenerationFormData) => {
    setIsLoading(true);
    try {
        await createPhysicalTickets(data.quantity, data.ticketTypeId);
        toast({ title: "Lote generado", description: `${data.quantity} boletos físicos han sido creados.` });
    } catch(error: any) {
        console.error(error);
        toast({ variant: 'destructive', title: 'Error al generar', description: error.message });
    } finally {
        setIsLoading(false);
    }
  };

  const handleExport = () => {
      // TODO: Implement CSV/ZIP export functionality
      toast({
          variant: "default",
          title: "Función no implementada",
          description: "La exportación a CSV/ZIP se añadirá en una futura versión."
      })
  }

  const openQrDialog = (code: string) => {
      setSelectedTicketCode(code);
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Boletos Físicos</h1>
          <p className="text-muted-foreground">Genera y gestiona los boletos para venta offline.</p>
        </div>
        <div className="flex gap-2">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button className="transition-transform hover:scale-105" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <PlusCircle className="mr-2 h-4 w-4" />}
                    Generar Lote Físico
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Generar Lote de Boletos Físicos</DialogTitle>
                <DialogDescription>Especifica la cantidad y el tipo de entrada para los boletos a crear.</DialogDescription>
                </DialogHeader>
                <GenerationForm onSave={handleGenerate} closeDialog={() => setIsDialogOpen(false)} />
            </DialogContent>
            </Dialog>
            <Button variant="outline" onClick={handleExport} disabled>
                <Download className="mr-2 h-4 w-4" />
                Descargar para Imprenta
            </Button>
        </div>
      </div>

      <Dialog>
        <div className="border rounded-lg bg-card transition-shadow hover:shadow-lg">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Código Alfanumérico</TableHead>
                <TableHead>Tipo de Boleto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Propietario</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {isLoadingTickets && (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                            <Loader2 className="mx-auto h-8 w-8 animate-spin" />
                        </TableCell>
                    </TableRow>
                )}
                {tickets?.map((ticket) => (
                <TableRow key={ticket.id} className="transition-colors hover:bg-muted/50">
                    <TableCell className="font-mono font-bold">{ticket.code}</TableCell>
                    <TableCell>{ticket.ticketTypeName}</TableCell>
                    <TableCell>
                    <Badge variant={ticket.customerEmail ? 'secondary' : 'default'} className={ticket.customerEmail ? 'bg-blue-500' : 'bg-green-500'}>
                        {ticket.customerEmail ? 'Digitalizado' : 'Por Asignar'}
                    </Badge>
                    </TableCell>
                    <TableCell>{ticket.ownerName || '---'}</TableCell>
                    <TableCell className="text-right">
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => openQrDialog(ticket.code)}>
                            <Eye className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    {/* Placeholder for download */}
                    <Button variant="ghost" size="icon" disabled>
                        <Download className="h-4 w-4" />
                    </Button>
                    </TableCell>
                </TableRow>
                ))}
                {!isLoadingTickets && tickets?.length === 0 && (
                     <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                            No se han generado boletos físicos todavía.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
        {selectedTicketCode && <QrDialog ticketCode={selectedTicketCode} />}
      </Dialog>
    </div>
  );
}

    