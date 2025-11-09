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
