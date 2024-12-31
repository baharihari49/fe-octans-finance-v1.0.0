import z from 'zod';

export interface typeSchmeTransactions {
    date: string | undefined;
    amount: number | undefined;
    description: string | undefined;
    transaction_type_id: number | undefined;
    transaction_category_id: number | undefined;
}

export const formSchmeaTransaction = z.object({
    date: z.string(), // Assuming date is in string format (e.g., ISO string or custom format)
    amount: z.number(),
    description: z.string(),
    transaction_type_id: z.number(),
    transaction_category_id: z.number(),
})