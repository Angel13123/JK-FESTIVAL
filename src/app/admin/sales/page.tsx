
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Ticket } from "lucide-react";
import { getOrders, getTicketsByOrderId } from "@/lib/orders-service";
import type { Order, Ticket as TicketType } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import QRCode from "qrcode.react";

function OrderTicketsDialog({ order, tickets }: { order: Order; tickets: TicketType[] }) {
    return (
        <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
                <DialogTitle>Tickets del Pedido</DialogTitle>
                <DialogDescription>
                    Pedido <span className="font-mono">{order.id}</span> de {order.customerEmail}
                </DialogDescription>
            </DialogHeader>
            <div className="max-h-[60vh] overflow-y-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ticket ID</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Código</TableHead>
                            <TableHead>QR</TableHead>
                            <TableHead>Estado</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tickets.map((ticket) => (
                            <TableRow key={ticket.id}>
                                <TableCell className="font-mono text-xs">{ticket.id}</TableCell>
                                <TableCell>{ticket.ticketTypeName}</TableCell>
                                <TableCell className="font-mono font-bold">{ticket.code}</TableCell>
                                <TableCell>
                                    <QRCode value={ticket.code} size={64} />
                                </TableCell>
                                <TableCell>
                                    <Badge variant={ticket.status === 'valid' ? 'default' : ticket.status === 'used' ? 'secondary' : 'destructive'}>
                                        {ticket.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </DialogContent>
    )
}

export default function SalesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedOrderTickets, setSelectedOrderTickets] = useState<TicketType[]>([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedOrders = await getOrders();
      setOrders(fetchedOrders);
    }
    fetchData();
  }, []);
  
  const handleViewTickets = async (order: Order) => {
    setSelectedOrder(order);
    const tickets = await getTicketsByOrderId(order.id);
    setSelectedOrderTickets(tickets);
  }
  
  const getTotalTicketsForOrder = (order: Order) => {
      return order.ticketItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold font-headline">Ventas Totales</h1>
        <p className="text-muted-foreground">Un historial completo de todos los pedidos realizados.</p>
      </div>
      
      <Dialog>
        <Card className="transition-shadow duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Todos los Pedidos</CardTitle>
            <CardDescription>Aquí están todos los pedidos realizados en la plataforma.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>País</TableHead>
                        <TableHead># Tickets</TableHead>
                        <TableHead className="hidden md:table-cell">Fecha</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>
                                <div className="font-medium">{order.customerName}</div>
                                <div className="text-sm text-muted-foreground">{order.customerEmail}</div>
                            </TableCell>
                            <TableCell>{order.customerCountry}</TableCell>
                            <TableCell>
                               <Badge variant="secondary" className="flex items-center gap-1.5">
                                 <Ticket className="h-3 w-3"/>
                                 {getTotalTicketsForOrder(order)}
                               </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                {order.createdAt ? format(new Date(order.createdAt.seconds * 1000), "d MMM yyyy, HH:mm", { locale: es }) : 'N/A'}
                            </TableCell>
                            <TableCell className="text-right font-medium">{order.totalAmount.toFixed(2)} EUR</TableCell>
                            <TableCell className="text-right">
                                <DialogTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={() => handleViewTickets(order)}>
                                        <Eye className="h-4 w-4" />
                                        <span className="sr-only">Ver Tickets</span>
                                    </Button>
                                </DialogTrigger>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {orders.length === 0 && (
                <div className="text-center p-8 text-muted-foreground">No hay pedidos todavía.</div>
            )}
          </CardContent>
        </Card>
        {selectedOrder && (
             <OrderTicketsDialog order={selectedOrder} tickets={selectedOrderTickets}/>
        )}
      </Dialog>
    </div>
  );
}
