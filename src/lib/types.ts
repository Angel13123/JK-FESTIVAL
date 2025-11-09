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
    totalAmount: number;
    createdAt: string; // ISO 8601 date string
    ticketItems: {
        ticketTypeId: string;
        quantity: number;
        unitPrice: number;
    }[];
};

export type Ticket = {
    id: string;
    orderId: string;
    ticketTypeId: string;
    ticketTypeName: string;
    ownerName: string;
    status: 'valid' | 'used' | 'revoked';
    code: string; // The "Gemini" generated code
    createdAt: string; // ISO 8601 date string
};

export type OrderStats = {
  totalRevenue: number;
  totalTicketsSold: number;
  totalOrders: number;
}
