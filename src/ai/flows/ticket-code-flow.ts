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
    code: z.string().length(20).describe('The unique 20-character alphanumeric ticket code.'),
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
    prompt: `Generate a unique, random, 20-character alphanumeric ticket code for the JK Festival.
    
    The code must consist of ONLY uppercase letters (A-Z) and numbers (0-9).
    The mix must be completely random.
    The final output code must be exactly 20 characters long. Do not generate 19 or 21 characters.
    
    For example: 4F8KWP9Z2V6J3N7R1Y0E`,
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
