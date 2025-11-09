"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Ticket, DollarSign, Users, QrCode } from "lucide-react";
import { getOrders, getTickets, getStats } from "@/lib/orders-service";
import type { Order, Ticket as TicketType, OrderStats } from "@/lib/types";

export default function AdminDashboard() {
  const [stats, setStats] = useState<OrderStats>({ totalRevenue: 0, totalTicketsSold: 0, totalOrders: 0 });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    // In a real app, this data would be fetched from an API.
    // For now, we use the service directly.
    setStats(getStats());
    setRecentOrders(getOrders().slice(0, 5));
  }, []);

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <p className="text-muted-foreground">Un resumen del estado del festival.</p>
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
          <CardTitle>Últimos Pedidos</CardTitle>
          <CardDescription>Los 5 pedidos más recientes.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID de Orden</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Nº Entradas</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id} className="transition-colors hover:bg-muted/50">
                  <TableCell className="font-medium font-mono text-xs">{order.id}</TableCell>
                  <TableCell>{order.customerEmail}</TableCell>
                  <TableCell>{order.ticketItems.reduce((acc, item) => acc + item.quantity, 0)}</TableCell>
                  <TableCell>{order.totalAmount.toFixed(2)} EUR</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString('es-ES')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
