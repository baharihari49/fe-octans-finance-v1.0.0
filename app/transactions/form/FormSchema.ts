import z from 'zod';

export interface typeSchmeTransactions {
    date: string;
    amount: number;
    description: string;
    transaction_type_id: number;
    transaction_category_id: number;
}

export const formSchmeaTransaction = z.object({
    date: z.string(), // Assuming date is in string format (e.g., ISO string or custom format)
    amount: z.number(),
    description: z.string(),
    transaction_type_id: z.number(),
    transaction_category_id: z.number(),
})