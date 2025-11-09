
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Ticket, DollarSign, Users, Eye } from "lucide-react";
import { getOrders, getTicketsByOrderId, getStats } from "@/lib/orders-service";
import type { Order, Ticket as TicketType, OrderStats } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

function OrderTicketsDialog({ order, tickets }: { order: Order; tickets: TicketType[] }) {
    return (
        <DialogContent className="sm:max-w-3xl">
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

export default function AdminDashboard() {
  const [stats, setStats] = useState<OrderStats>({ totalRevenue: 0, totalTicketsSold: 0, totalOrders: 0 });
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedOrderTickets, setSelectedOrderTickets] = useState<TicketType[]>([]);
  const [isTicketsLoading, setIsTicketsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const fetchedStats = await getStats();
      const fetchedOrders = await getOrders();
      setStats(fetchedStats);
      setOrders(fetchedOrders);
    }
    fetchData();
  }, []);
  
  const handleViewTickets = async (order: Order) => {
    setSelectedOrder(order);
    setIsTicketsLoading(true);
    const tickets = await getTicketsByOrderId(order.id);
    setSelectedOrderTickets(tickets);
    setIsTicketsLoading(false);
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <p className="text-muted-foreground">Un resumen del estado del festival basado en datos de Firestore.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRevenue.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</div>
            <p className="text-xs text-muted-foreground">Ingresos de todas las ventas</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entradas Vendidas</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTicketsSold.toLocaleString()}</div>
             <p className="text-xs text-muted-foreground">{stats.totalOrders} pedidos en total</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos Totales</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Pedidos procesados con éxito</p>
          </CardContent>
        </Card>
      </div>

      <Dialog>
        <Card className="transition-shadow duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Pedidos Recientes</CardTitle>
            <CardDescription>Aquí están los últimos pedidos realizados.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>País</TableHead>
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
