import { z } from 'zod';

export interface TypeSchemaVendor {
  name_of_bisnis: string | undefined;
  transaction_type_id: number | undefined;
  email: string | undefined;
  address: string | undefined;
  no_hp: string | undefined;
}

export const formSchemaVendor = z.object({
  name_of_bisnis: z
    .string()
    .min(3, { message: "Nama bisnis harus diisi setidaknya 3 karakter" }),
    
  transaction_type_id: z
    .number({ invalid_type_error: "Kategori Transaksi harus dipilih" })
    .gt(0, { message: "Kategori Transaksi harus dipilih" }),

  email: z
    .string()
    .email({ message: "Format email tidak valid" }),

  address: z
    .string()
    .min(5, { message: "Alamat harus diisi setidaknya 5 karakter" }),

  no_hp: z
    .string()
    .min(10, { message: "Nomor HP harus diisi dengan benar" })
    .regex(/^\d+$/, { message: "Nomor HP hanya boleh berisi angka" }),
});
