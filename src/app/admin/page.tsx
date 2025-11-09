import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Ticket, DollarSign, Users } from "lucide-react";

// Mock data
const stats = {
  ticketsSold: 1256,
  revenue: 56520,
  attendees: 432,
};

const mockOrders = [
  { id: "ORD001", email: "user1@example.com", tickets: 2, status: "Completado" },
  { id: "ORD002", email: "user2@example.com", tickets: 1, status: "Completado" },
  { id: "ORD003", email: "user3@example.com", tickets: 4, status: "Completado" },
  { id: "ORD004", email: "user4@example.com", tickets: 2, status: "Pendiente" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <p className="text-muted-foreground">Un resumen del estado del festival.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entradas Vendidas</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.ticketsSold.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20.1% desde la última semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.revenue.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</div>
            <p className="text-xs text-muted-foreground">+15.2% desde la última semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Asistentes Registrados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.attendees.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+50 desde ayer</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Últimos Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID de Orden</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Nº Entradas</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.email}</TableCell>
                  <TableCell>{order.tickets}</TableCell>
                  <TableCell>
                    <Badge variant={order.status === 'Completado' ? 'default' : 'secondary'} className={order.status === 'Completado' ? 'bg-green-500' : ''}>
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
