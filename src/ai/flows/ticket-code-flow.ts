
'use client';
/**
 * @fileOverview A utility to generate a unique ticket code.
 *
 * - generateTicketCode - A function that returns a unique ticket code.
 */

/**
 * Generates a random, 20-character alphanumeric string.
 * This is a deterministic local function that is compatible with static export.
 * @returns {Promise<string>} A promise that resolves to the 20-character code.
 */
export async function generateTicketCode(): Promise<string> {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 20; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
