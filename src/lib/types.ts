

import { Timestamp } from "firebase/firestore";

export type Artist = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  day: number;
  stage: 'Main Stage' | 'Urban Stage' | 'Electronic Stage';
  time: string;
};

export type TicketType = {
  id: string;
  name: string;
  price: number;
  benefits: string[];
  isAvailable: boolean;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type Sponsor = {
  id: string;
  name:string;
  logoUrl: string;
};

export type CartItem = {
  ticketTypeId: string;
  quantity: number;
};

// --- Order and Ticket Types for the new service ---

export type Order = {
    id: string;
    customerName: string;
    customerEmail: string;
    customerCountry: string;
    totalAmount: number;
    createdAt: Timestamp;
    ticketItems: {
        ticketTypeId: string;
        quantity: number;
        unitPrice: number;
    }[];
};

export type Ticket = {
    id: string;
    orderId?: string; // Optional for physical tickets
    ticketTypeId: string;
    ticketTypeName: string;
    ownerName: string | null;
    customerEmail: string | null;
    status: 'valid' | 'used' | 'revoked';
    code: string; // The "Gemini" generated code
    createdAt: Timestamp;
    isPhysical?: boolean; // Flag for tickets generated for physical sale
    isPhysicalImport?: boolean; // Added for physical ticket distinction
};

export type OrderStats = {
  totalRevenue: number;
  totalTicketsSold: number;
  totalOrders: number;
}

// --- Mobile App Specific Types ---
export type AppUser = {
  email: string;
  username: string;
  pin: string;
  createdAt: Timestamp;
}

    