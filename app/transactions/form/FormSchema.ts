import z from 'zod';

export interface typeSchmeTransactions {
    date: string | undefined;
    amount: number | undefined;
    descriptions: string | undefined;
    transaction_type_id: number | undefined;
    transaction_category_id: number | undefined;
}

export const formSchmeaTransaction = z.object({
    date: z.string().min(3, { message: "Date must be at least 3 characters long" }), // Assuming date is in string format (e.g., ISO string or custom format)
    amount: z.string().min(3, { message: "Amount must be at least than 0" }),
    descriptions: z.string().min(3, { message: "Description must be at least 3 characters long" }),
    transaction_type_id: z.number().gt(0, { message: "Transaction type ID must be greater than 0" }),
    transaction_category_id: z.number().gt(0, { message: "Transaction category ID must be greater than 0" }),
});
