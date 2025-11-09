// This is a mock service that simulates a database for orders and tickets.
// In a real application, this would be replaced with calls to a real database like Firestore.

import { Order, Ticket, CartItem, OrderStats } from './types';
import { ticketTypes } from './data';

// In-memory database
let orders: Order[] = [];
let tickets: Ticket[] = [];

/**
 * Generates a unique alphanumeric ticket code.
 * In the future, this function could be replaced with a call to a generative AI model like Gemini
 * to create more creative or themed codes, but for now, it simulates the behavior.
 * @returns A unique ticket code string.
 */
function generateGeminiTicketCode(): string {
  const chars = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
  let code = 'JKF-';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
    if(i === 3) code += '-';
  }
  return code;
}


interface CreateOrderPayload {
    customerName: string;
    customerEmail: string;
    totalAmount: number;
    cartItems: CartItem[];
}

export function createOrder(payload: CreateOrderPayload): Order {
  const orderId = `ORD-${Date.now()}`;
  
  const order: Order = {
    id: orderId,
    customerName: payload.customerName,
    customerEmail: payload.customerEmail,
    totalAmount: payload.totalAmount,
    createdAt: new Date().toISOString(),
    ticketItems: payload.cartItems.map(item => {
        const ticketType = ticketTypes.find(tt => tt.id === item.ticketTypeId);
        return {
            ticketTypeId: item.ticketTypeId,
            quantity: item.quantity,
            unitPrice: ticketType?.price || 0
        }
    })
  };

  orders.push(order);

  // Generate individual tickets for the order
  for (const item of payload.cartItems) {
    const ticketType = ticketTypes.find(t => t.id === item.ticketTypeId);
    if (ticketType) {
        for (let i = 0; i < item.quantity; i++) {
            const ticket: Ticket = {
                id: `TKT-${orderId}-${tickets.length + 1}`,
                orderId: orderId,
                ticketTypeId: item.ticketTypeId,
                ticketTypeName: ticketType.name,
                ownerName: payload.customerName,
                status: 'valid',
                code: generateGeminiTicketCode(),
                createdAt: new Date().toISOString(),
            };
            tickets.push(ticket);
        }
    }
  }
  
  console.log("New order created:", order);
  console.log("Current tickets DB:", tickets);

  return order;
}

export function getOrders(): Order[] {
  // Return orders sorted by most recent
  return [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getTickets(): Ticket[] {
    return [...tickets];
}

export function getOrderById(id: string): Order | undefined {
    return orders.find(o => o.id === id);
}

export function getTicketsByOrderId(orderId: string): Ticket[] {
    return tickets.filter(t => t.orderId === orderId);
}

export function getStats(): OrderStats {
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalTicketsSold = tickets.length;
    return {
        totalRevenue,
        totalTicketsSold,
        totalOrders: orders.length
    }
}


// --- Ticket Validation ---

interface ValidationResponse {
    status: 'valid' | 'used' | 'not_found';
    message: string;
    ticket?: Ticket;
}

export function validateTicket(code: string): ValidationResponse {
    const ticket = tickets.find(t => t.code.toUpperCase() === code.toUpperCase());

    if (!ticket) {
        return { status: 'not_found', message: 'Entrada no encontrada en la base de datos.' };
    }

    if (ticket.status === 'used') {
        return { status: 'used', message: `Entrada ya utilizada. Propietario: ${ticket.ownerName}.`, ticket };
    }

    return { status: 'valid', message: `Entrada válida. Propietario: ${ticket.ownerName}.`, ticket };
}

export function markTicketAsUsed(ticketId: string): boolean {
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket) {
        ticket.status = 'used';
        return true;
    }
    return false;
}
