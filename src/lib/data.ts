import type { Artist, TicketType, FaqItem, Sponsor } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const artists: Artist[] = [
  {
    id: '1',
    name: 'YUNG BEE',
    description: 'The hottest trap artist from the North.',
    imageUrl: PlaceHolderImages.find(p => p.id === 'artist1')?.imageUrl || '',
    day: 1,
    stage: 'Main Stage',
    time: '22:00',
  },
  {
    id: '2',
    name: 'MC KHALIFA',
    description: 'Real rap, real stories. A voice of the streets.',
    imageUrl: PlaceHolderImages.find(p => p.id === 'artist2')?.imageUrl || '',
    day: 1,
    stage: 'Urban Stage',
    time: '20:30',
  },
  {
    id: '3',
    name: 'DJ LILA',
    description: 'Spinning the best urban and electronic beats.',
    imageUrl: PlaceHolderImages.find(p => p.id === 'artist3')?.imageUrl || '',
    day: 1,
    stage: 'Electronic Stage',
    time: '00:00',
  },
  {
    id: '4',
    name: 'RANIA REBEL',
    description: 'The new queen of Moroccan pop and R&B.',
    imageUrl: PlaceHolderImages.find(p => p.id === 'artist4')?.imageUrl || '',
    day: 1,
    stage: 'Main Stage',
    time: '19:00',
  },
];

export const ticketTypes: TicketType[] = [
  {
    id: 'general',
    name: 'Entrada General',
    price: 45,
    benefits: ['Acceso al recinto del festival', 'Acceso a todas las actuaciones'],
    isAvailable: true,
  },
  {
    id: 'vip',
    name: 'Entrada VIP',
    price: 120,
    benefits: [
      'Acceso a la zona VIP',
      'Barra libre en zona VIP',
      'Vistas privilegiadas del escenario principal',
      'Pack de merchandising',
    ],
    isAvailable: true,
  },
  {
    id: 'earlybird',
    name: 'Early Bird',
    price: 30,
    benefits: ['Acceso al recinto del festival', 'Precio reducido por tiempo limitado'],
    isAvailable: false,
  },
];

export const faqItems: FaqItem[] = [
  {
    id: 'q1',
    question: '¿Cuál es la edad mínima para asistir?',
    answer: 'La edad mínima para acceder al festival es de 18 años. Se requerirá un documento de identidad válido en la entrada.',
  },
  {
    id: 'q2',
    question: '¿Qué objetos no están permitidos?',
    answer:
      'No se permite la entrada de comida o bebida del exterior, objetos punzantes, armas, sustancias ilegales o equipo de grabación profesional.',
  },
  {
    id: 'q3',
    question: '¿Hay política de reembolso?',
    answer: 'Las entradas no son reembolsables, excepto en caso de cancelación del festival. Consulta nuestros términos y condiciones para más detalles.',
  },
  {
    id: 'q4',
    question: '¿Qué hago si pierdo mi entrada?',
    answer:
      'La entrada es tu responsabilidad. No podemos reemplazar entradas perdidas o robadas. Asegúrate de guardarla en un lugar seguro.',
  },
];

export const sponsors: Sponsor[] = [
    { id: 'sp1', name: 'Sponsor 1', logoUrl: PlaceHolderImages.find(p => p.id === 'sponsor1')?.imageUrl || '' },
    { id: 'sp2', name: 'Sponsor 2', logoUrl: PlaceHolderImages.find(p => p.id === 'sponsor2')?.imageUrl || '' },
    { id: 'sp3', name: 'Sponsor 3', logoUrl: PlaceHolderImages.find(p => p.id === 'sponsor3')?.imageUrl || '' },
    { id: 'sp4', name: 'Sponsor 4', logoUrl: PlaceHolderImages.find(p => p.id === 'sponsor4')?.imageUrl || '' },
];
