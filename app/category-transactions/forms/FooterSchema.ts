import z from 'zod';


export interface typeSchmeCategoryTransaction {
    name: string | undefined;
    transaction_type_id: number | undefined;
}

export const formSchmeaCategoryTransaction = z.object({
    name: z.string().min(3, { message: "Nama Harus di isi setidaknya 3 karakter" }),
    transaction_type_id: z.number().gt(0, { message: "Kategori Transaksi harus dipilih" }),
});