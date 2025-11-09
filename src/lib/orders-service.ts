'use client';
import {
  collection,
  doc,
  writeBatch,
  query,
  getDocs,
  where,
  updateDoc,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/firebase/client'; // Assuming db is your Firestore instance
import type { Order, Ticket, CartItem, OrderStats } from './types';
import { ticketTypes } from './data';
import { FirestorePermissionError, errorEmitter } from '@/firebase';
import { generateTicketCode } from '@/ai/flows/ticket-code-flow';

// --- Firestore Data Service ---

const ordersCollection = collection(db, 'orders');
const ticketsCollection = collection(db, 'tickets');

interface CreateOrderPayload {
    customerName: string;
    customerEmail: string;
    customerCountry: string;
    totalAmount: number;
    cartItems: CartItem[];
}

/**
 * Creates an order and its associated tickets in Firestore.
 * It uses a Gemini flow to generate a unique ticket code.
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
    customerCountry: payload.customerCountry,
    totalAmount: payload.totalAmount,
    createdAt: new Date().toISOString(), // This will be replaced by serverTimestamp, but good for local object
    ticketItems: payload.cartItems.map(item => {
        const ticketType = ticketTypes.find(tt => tt.id === item.ticketTypeId);
        return {
            ticketTypeId: item.ticketTypeId,
            quantity: item.quantity,
            unitPrice: ticketType?.price || 0
        }
    })
  };

  // Add server-side timestamp to the data being sent to Firestore
  batch.set(orderRef, { ...newOrder, createdAt: serverTimestamp() });

  // Generate individual tickets for the order
  for (const item of payload.cartItems) {
    const ticketType = ticketTypes.find(t => t.id === item.ticketTypeId);
    if (ticketType) {
        for (let i = 0; i < item.quantity; i++) {
            const ticketRef = doc(ticketsCollection);
            
            // Generate a unique ticket code using the Gemini flow
            const uniqueCode = await generateTicketCode();
            
            const ticket: Ticket = {
                id: ticketRef.id,
                orderId: orderId,
                ticketTypeId: item.ticketTypeId,
                ticketTypeName: ticketType.name,
                ownerName: payload.customerName,
                status: 'valid',
                code: uniqueCode.toUpperCase(),
                createdAt: new Date().toISOString(), // Again, for local object consistency
            };
            batch.set(ticketRef, { ...ticket, createdAt: serverTimestamp() });
        }
    }
  }

  // Chain a .catch() to handle potential permission errors from the batch commit.
  await batch.commit().catch(error => {
    // We assume the error is from creating the order, as it's a common entry point.
    // A more granular approach might be needed if rules are complex.
    const permissionError = new FirestorePermissionError({
      path: orderRef.path, // We use the order path as the primary context for the batch write
      operation: 'create',
      requestResourceData: newOrder,
    });
    // Emit the contextual error globally.
    errorEmitter.emit('permission-error', permissionError);
    // Re-throw the original error to be caught by the caller
    throw error;
  });

  return newOrder;
}

export async function getOrders(): Promise<Order[]> {
  const snapshot = await getDocs(query(ordersCollection, orderBy("createdAt", "desc")));
  return snapshot.docs.map(doc => doc.data() as Order);
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
    const ordersSnapshot = await getDocs(query(ordersCollection));
    
    const totalRevenue = ordersSnapshot.docs.reduce((sum, doc) => sum + (doc.data() as Order).totalAmount, 0);
    const totalOrders = ordersSnapshot.size;

    // To get total tickets, we sum the quantities from each order's ticketItems
    const totalTicketsSold = ordersSnapshot.docs.reduce((sum, doc) => {
        const order = doc.data() as Order;
        return sum + (order.ticketItems?.reduce((itemSum, item) => itemSum + item.quantity, 0) || 0);
    }, 0);
    
    return {
        totalRevenue,
        totalTicketsSold,
        totalOrders
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

export async function markTicketAsUsed(ticketId: string): Promise<void> {
    const ticketRef = doc(ticketsCollection, ticketId);
    
    // Do not await, chain .catch for non-blocking error handling
    updateDoc(ticketRef, { status: 'used' })
        .catch(error => {
            const permissionError = new FirestorePermissionError({
              path: ticketRef.path,
              operation: 'update',
              requestResourceData: { status: 'used' },
            });
            errorEmitter.emit('permission-error', permissionError);
            throw error; // Re-throw to let the caller know
        });
}
