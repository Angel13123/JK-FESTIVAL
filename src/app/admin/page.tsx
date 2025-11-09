"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Ticket, DollarSign, Users, QrCode } from "lucide-react";
import { getOrders, getStats, getTicketsByOrderId } from "@/lib/orders-service";
import type { Order, Ticket as TicketType, OrderStats } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const [stats, setStats] = useState<OrderStats>({ totalRevenue: 0, totalTicketsSold: 0, totalOrders: 0 });
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderTickets, setSelectedOrderTickets] = useState<TicketType[]>([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedStats = await getStats();
      const fetchedOrders = await getOrders();
      setStats(fetchedStats);
      setOrders(fetchedOrders);
    }
    fetchData();
  }, []);

  const handleOrderSelect = async (orderId: string) => {
    if (selectedOrderTickets.length > 0 && selectedOrderTickets[0].orderId === orderId) {
      setSelectedOrderTickets([]); // Deselect if the same order is clicked again
    } else {
      const tickets = await getTicketsByOrderId(orderId);
      setSelectedOrderTickets(tickets);
    }
  };


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

      <Card className="transition-shadow duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle>Pedidos Recientes</CardTitle>
          <CardDescription>Haz clic en un pedido para ver los tickets asociados.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {orders.map((order) => (
              <AccordionItem value={order.id} key={order.id}>
                <AccordionTrigger onClick={() => handleOrderSelect(order.id)}>
                   <div className="flex justify-between w-full pr-4">
                      <span className="font-mono text-xs">{order.id}</span>
                      <span>{order.customerEmail}</span>
                      <span>{order.totalAmount.toFixed(2)} EUR</span>
                   </div>
                </AccordionTrigger>
                <AccordionContent>
                  {selectedOrderTickets.length > 0 && selectedOrderTickets[0].orderId === order.id ? (
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
                          {selectedOrderTickets.map((ticket) => (
                            <TableRow key={ticket.id}>
                              <TableCell className="font-mono text-xs">{ticket.id}</TableCell>
                              <TableCell>{ticket.ticketTypeName}</TableCell>
                              <TableCell className="font-mono">{ticket.code}</TableCell>
                              <TableCell>
                                <Badge variant={ticket.status === 'valid' ? 'default' : 'destructive'}>
                                  {ticket.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                  ) : <p className="text-center text-muted-foreground py-4">Cargando tickets...</p>}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
