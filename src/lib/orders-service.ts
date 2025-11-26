
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
  Timestamp,
  limit,
  getFirestore,
} from 'firebase/firestore';
import type { Order, Ticket, CartItem, OrderStats } from './types';
import { ticketTypes } from './data';
import { FirestorePermissionError, errorEmitter, initializeFirebase } from '@/firebase';
import { generateTicketCode } from '@/ai/flows/ticket-code-flow';

const { firestore: db } = initializeFirebase();

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
 * Creates an order and its associated tickets in Firestore using an atomic batch write.
 * It uses a Gemini flow to generate a unique ticket code for each ticket.
 * If any part of the process fails (code generation, Firestore write), the entire operation is rolled back.
 * @param payload - The data for the new order.
 * @returns The newly created order.
 * @throws Throws an error if ticket code generation or the Firestore batch commit fails.
 */
export async function createOrderAndTickets(payload: CreateOrderPayload): Promise<Order> {
  const batch = writeBatch(db);
  
  const orderRef = doc(ordersCollection);
  const orderId = orderRef.id;

  const newOrderData: Omit<Order, 'createdAt'> = {
    id: orderId,
    customerName: payload.customerName,
    customerEmail: payload.customerEmail,
    customerCountry: payload.customerCountry,
    totalAmount: payload.totalAmount,
    ticketItems: payload.cartItems.map(item => {
        const ticketType = ticketTypes.find(tt => tt.id === item.ticketTypeId);
        return {
            ticketTypeId: item.ticketTypeId,
            quantity: item.quantity,
            unitPrice: ticketType?.price || 0
        }
    })
  };

  batch.set(orderRef, { ...newOrderData, createdAt: serverTimestamp() });

  try {
    // Generate all ticket codes first. If any fails, the batch won't be committed.
    const ticketPromises = payload.cartItems.flatMap(item => {
        const ticketType = ticketTypes.find(t => t.id === item.ticketTypeId);
        if (!ticketType) return [];
        
        return Array.from({ length: item.quantity }, async () => {
            const ticketRef = doc(ticketsCollection);
            // This will throw if the Genkit flow fails, preventing the batch commit.
            const uniqueCode = await generateTicketCode(); 
            
            const newTicket: Omit<Ticket, 'createdAt' > = {
                id: ticketRef.id,
                orderId: orderId,
                ticketTypeId: item.ticketTypeId,
                ticketTypeName: ticketType.name,
                ownerName: payload.customerName,
                customerEmail: payload.customerEmail,
                status: 'valid',
                code: uniqueCode.toUpperCase(),
            };
            batch.set(ticketRef, { ...newTicket, createdAt: serverTimestamp() });
        });
    });

    // Wait for all ticket generation and batching to be prepared.
    await Promise.all(ticketPromises);

  } catch (error) {
    console.error("Error during ticket code generation:", error);
    // Re-throw the error to be caught by the checkout page, preventing order creation.
    throw new Error("Failed to generate ticket codes. The order was not created.");
  }


  // Commit the entire batch atomically.
  await batch.commit().catch(error => {
    // Create a contextual error if the batch commit fails due to permissions.
    const permissionError = new FirestorePermissionError({
      path: orderRef.path, // Use order path as context for the batch write.
      operation: 'create',
      requestResourceData: newOrderData,
    });
    // Emit the error for global handling.
    errorEmitter.emit('permission-error', permissionError);
    // Re-throw the original Firestore error to be caught by the caller.
    throw error;
  });
  
  // If we get here, the batch was successful.
  return { ...newOrderData, id: orderId, createdAt: Timestamp.now() };
}

export async function getOrders(count?: number): Promise<Order[]> {
  const q = count
    ? query(ordersCollection, orderBy("createdAt", "desc"), limit(count))
    : query(ordersCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
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
        return { status: 'used', message: `Esta entrada ya fue utilizada.`, ticket };
    }

    return { status: 'valid', message: `Entrada válida y lista para activar.`, ticket };
}

export async function markTicketAsUsed(ticketId: string): Promise<void> {
    const ticketRef = doc(ticketsCollection, ticketId);
    
    // Do not await, chain .catch for non-blocking error handling
    await updateDoc(ticketRef, { status: 'used' })
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

export async function deleteAllData(): Promise<{deletedOrders: number, deletedTickets: number}> {
    const batch = writeBatch(db);
    
    const ordersSnapshot = await getDocs(ordersCollection);
    ordersSnapshot.docs.forEach(doc => batch.delete(doc.ref));
    
    const ticketsSnapshot = await getDocs(ticketsCollection);
    ticketsSnapshot.docs.forEach(doc => batch.delete(doc.ref));

    await batch.commit().catch(error => {
      // Create a generic error for the batch operation
      const permissionError = new FirestorePermissionError({
          path: '/', // Path is generic as it affects multiple collections
          operation: 'delete',
      });
      errorEmitter.emit('permission-error', permissionError);
      throw error;
    });

    return {
      deletedOrders: ordersSnapshot.size,
      deletedTickets: ticketsSnapshot.size,
    };
}
