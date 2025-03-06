import z from 'zod';

export interface typeSchmeCategoryBudgeting {
   value: string;
}

export const formSchmeaCategoryBudgeting = z.object({
    value: z.number()
        .int({ message: "Jumlah harus berupa bilangan bulat" }) // Validasi sebagai bilangan bulat
        .gt(5, { message: "Jumlah harus lebih besar dari 5" }) // Validasi nilai harus lebih besar dari 5
});