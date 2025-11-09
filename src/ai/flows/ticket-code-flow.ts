'use server';
/**
 * @fileOverview A Genkit flow to generate a unique ticket code.
 *
 * - generateTicketCode - A function that returns a unique ticket code.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const TicketCodeInputSchema = z.object({});
export type TicketCodeInput = z.infer<typeof TicketCodeInputSchema>;

const TicketCodeOutputSchema = z.object({
    code: z.string().length(10).describe('The unique 10-character alphanumeric ticket code.'),
});
export type TicketCodeOutput = z.infer<typeof TicketCodeOutputSchema>;


export async function generateTicketCode(): Promise<string> {
    const result = await ticketCodeFlow({});
    return result.code;
}

const prompt = ai.definePrompt({
    name: 'ticketCodePrompt',
    input: { schema: TicketCodeInputSchema },
    output: { schema: TicketCodeOutputSchema },
    prompt: `Generate a unique, random, 10-character alphanumeric ticket code for the JK Festival.
    
    It should be memorable and easy to type, but secure. Mix uppercase letters and numbers.
    
    For example: JK24FEST9B, G0LD3N25EP, AUREO26TIX`,
});

const ticketCodeFlow = ai.defineFlow(
  {
    name: 'ticketCodeFlow',
    inputSchema: TicketCodeInputSchema,
    outputSchema: TicketCodeOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
