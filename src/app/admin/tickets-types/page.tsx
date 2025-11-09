"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { ticketTypes as mockTicketTypes } from "@/lib/data";
import type { TicketType } from "@/lib/types";

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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Edit } from "lucide-react";

const ticketSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "El nombre es obligatorio."),
  price: z.coerce.number().min(0, "El precio no puede ser negativo."),
  benefits: z.string().min(1, "Debe haber al menos un beneficio."),
  isAvailable: z.boolean(),
});

type TicketFormData = z.infer<typeof ticketSchema>;

function TicketForm({ ticket, onSave, closeDialog }: { ticket?: TicketFormData; onSave: (data: TicketFormData) => void; closeDialog: () => void }) {
  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: ticket || { name: "", price: 0, benefits: "", isAvailable: true },
  });

  function onSubmit(data: TicketFormData) {
    onSave(data);
    closeDialog();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem><FormLabel>Nombre</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="price" render={({ field }) => (
          <FormItem><FormLabel>Precio (EUR)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="benefits" render={({ field }) => (
          <FormItem><FormLabel>Beneficios (separados por comas)</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="isAvailable" render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5"><FormLabel>Disponible para la venta</FormLabel></div>
            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
          </FormItem>
        )} />
        <DialogFooter>
          <Button type="submit">Guardar</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}


export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<TicketType[]>(mockTicketTypes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<TicketFormData | undefined>(undefined);

  const handleSave = (data: TicketFormData) => {
    // TODO: This should be an API call to the backend.
    if (editingTicket) {
      setTickets(tickets.map(t => t.id === editingTicket.id ? { ...t, ...data, benefits: data.benefits.split(',') } : t));
    } else {
      const newTicket: TicketType = {
        id: `ticket_${Date.now()}`,
        ...data,
        benefits: data.benefits.split(','),
      };
      setTickets([...tickets, newTicket]);
    }
    setEditingTicket(undefined);
  };
  
  const openEditDialog = (ticket: TicketType) => {
    setEditingTicket({ ...ticket, benefits: ticket.benefits.join(',') });
    setIsDialogOpen(true);
  };

  const openNewDialog = () => {
    setEditingTicket(undefined);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline">Gestionar Tipos de Entradas</h1>
          <p className="text-muted-foreground">Añade, edita o desactiva los tipos de entradas.</p>
        </div>
         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewDialog}><PlusCircle className="mr-2 h-4 w-4" />Añadir Tipo</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingTicket ? "Editar" : "Añadir"} Tipo de Entrada</DialogTitle>
              <DialogDescription>Completa los detalles de la entrada.</DialogDescription>
            </DialogHeader>
            <TicketForm ticket={editingTicket} onSave={handleSave} closeDialog={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">{ticket.name}</TableCell>
                <TableCell>{ticket.price} EUR</TableCell>
                <TableCell>
                  <Badge variant={ticket.isAvailable ? 'default' : 'outline'} className={ticket.isAvailable ? 'bg-green-500' : ''}>
                    {ticket.isAvailable ? 'Activo' : 'Inactivo'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(ticket)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
