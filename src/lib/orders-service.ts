'use client';
import {
  collection,
  doc,
  writeBatch,
  query,
  getDocs,
  where,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/firebase/client'; // Assuming db is your Firestore instance
import type { Order, Ticket, CartItem, OrderStats } from './types';
import { ticketTypes } from './data';

// --- Ticket Code Generation ---

/**
 * Generates a unique alphanumeric ticket code.
 *
 * TODO: Replace this function with a call to the Gemini API
 * to generate unique, 10-character alphanumeric codes.
 *
 * @returns A unique ticket code string.
 */
export function generateRandomTicketCode(length: number = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * chars.length);
    result += chars[index];
  }
  return result;
}


// --- Firestore Data Service ---

const ordersCollection = collection(db, 'orders');
const ticketsCollection = collection(db, 'tickets');

interface CreateOrderPayload {
    customerName: string;
    customerEmail: string;
    totalAmount: number;
    cartItems: CartItem[];
}

/**
 * Creates an order and its associated tickets in Firestore.
 * For this specific test, it uses a fixed ticket code.
 * @param payload - The data for the new order.
 * @returns The newly created order.
 */
export async function createOrderAndTickets(payload: CreateOrderPayload): Promise<Order> {
  const batch = writeBatch(db);
  
  const orderRef = doc(ordersCollection);
  const orderId = orderRef.id;

  const newOrder: Order = {
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

  batch.set(orderRef, newOrder);

  // Generate individual tickets for the order
  for (const item of payload.cartItems) {
    const ticketType = ticketTypes.find(t => t.id === item.ticketTypeId);
    if (ticketType) {
        for (let i = 0; i < item.quantity; i++) {
            const ticketRef = doc(ticketsCollection);
            const ticket: Ticket = {
                id: ticketRef.id,
                orderId: orderId,
                ticketTypeId: item.ticketTypeId,
                ticketTypeName: ticketType.name,
                ownerName: payload.customerName,
                status: 'valid',
                // Use the fixed code for this test
                code: 'An93lPru3b4',
                createdAt: new Date().toISOString(),
            };
            batch.set(ticketRef, ticket);
        }
    }
  }

  await batch.commit();
  console.log("New order and tickets created in Firestore:", newOrder.id);
  return newOrder;
}

export async function getOrders(): Promise<Order[]> {
  const snapshot = await getDocs(query(ordersCollection));
  return snapshot.docs.map(doc => doc.data() as Order).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getTicketsByOrderId(orderId: string): Promise<Ticket[]> {
    const q = query(ticketsCollection, where("orderId", "==", orderId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as Ticket);
}

export async function getAllTickets(): Promise<Ticket[]> {
  const snapshot = await getDocs(query(ticketsCollection));
  return snapshot.docs.map(doc => doc.data() as Ticket);
}


export async function getStats(): Promise<OrderStats> {
    const [ordersSnapshot, ticketsSnapshot] = await Promise.all([
        getDocs(query(ordersCollection)),
        getDocs(query(ticketsCollection))
    ]);

    const totalRevenue = ordersSnapshot.docs.reduce((sum, doc) => sum + (doc.data() as Order).totalAmount, 0);
    const totalTicketsSold = ticketsSnapshot.size;
    
    return {
        totalRevenue,
        totalTicketsSold,
        totalOrders: ordersSnapshot.size
    }
}


// --- Ticket Validation ---

interface ValidationResponse {
    status: 'valid' | 'used' | 'not_found';
    message: string;
    ticket?: Ticket;
}

export async function validateTicket(code: string): Promise<ValidationResponse> {
    const q = query(ticketsCollection, where("code", "==", code.toUpperCase()));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        return { status: 'not_found', message: 'Entrada no encontrada en la base de datos.' };
    }

    const ticketDoc = snapshot.docs[0];
    const ticket = ticketDoc.data() as Ticket;

    if (ticket.status === 'used') {
        return { status: 'used', message: `Entrada ya utilizada. Propietario: ${ticket.ownerName}.`, ticket };
    }

    return { status: 'valid', message: `Entrada válida. Propietario: ${ticket.ownerName}.`, ticket };
}

export async function markTicketAsUsed(ticketId: string): Promise<boolean> {
    const ticketRef = doc(ticketsCollection, ticketId);
    try {
        await updateDoc(ticketRef, { status: 'used' });
        return true;
    } catch (error) {
        console.error("Error marking ticket as used:", error);
        return false;
    }
}
