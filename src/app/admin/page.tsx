
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Ticket, DollarSign, Users, Eye, Trash2, Loader2 } from "lucide-react";
import { getOrders, getTicketsByOrderId, getStats, deleteAllData } from "@/lib/orders-service";
import type { Order, Ticket as TicketType, OrderStats } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import QRCode from "qrcode.react";
import { useToast } from "@/hooks/use-toast";

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

export default function AdminDashboard() {
  const { toast } = useToast();
  const [stats, setStats] = useState<OrderStats>({ totalRevenue: 0, totalTicketsSold: 0, totalOrders: 0 });
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedOrderTickets, setSelectedOrderTickets] = useState<TicketType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const fetchedStats = await getStats();
    const fetchedOrders = await getOrders(10);
    setStats(fetchedStats);
    setOrders(fetchedOrders);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  const handleViewTickets = async (order: Order) => {
    setSelectedOrder(order);
    const tickets = await getTicketsByOrderId(order.id);
    setSelectedOrderTickets(tickets);
  }

  const handleDeleteAllData = async () => {
    setIsLoading(true);
    try {
      const { deletedOrders, deletedTickets } = await deleteAllData();
      toast({
        title: "Datos eliminados",
        description: `Se eliminaron ${deletedOrders} pedidos y ${deletedTickets} boletos.`,
      });
      // Refresh data on screen
      fetchData();
    } catch (error) {
       console.error(error);
       // The global error handler will show a specific permission toast.
       // We only show a generic one if it's not a known Firebase error.
       if ((error as any).name !== 'FirebaseError') {
          toast({
            variant: "destructive",
            title: "Error al eliminar los datos",
            description: "No se pudieron borrar los datos. Revisa los permisos de la base de datos.",
          });
       }
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl">Dashboard</h1>
            <p className="text-muted-foreground">Un resumen del estado del festival basado en datos de Firestore.</p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={isLoading}>
                <Trash2 className="mr-2 h-4 w-4" />
                Borrar Datos
              </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción es irreversible. Se eliminarán permanentemente todos los pedidos y boletos de la base de datos.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAllData} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                Sí, borrar todo
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
            <CardDescription>Aquí están los últimos 10 pedidos realizados.</CardDescription>
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
            {isLoading ? (
                <div className="text-center p-8"><Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" /></div>
            ) : orders.length === 0 && (
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
