'use client';

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { clientApiRequest } from "@/services/clientApiRequest";
import React, { useEffect } from "react";
import { typeSchmeTransactions } from "./FormSchema";

// Define types for dataTransactionType and dataKategoriTransaksi
type TransactionType = { id: string; name: string;};
type CategoryType = { id: string; name: string;  transaction_type_id: string; };
type VendorType = {
  id: number;
  name: string;
} | null;

interface FormProps {
  setDataTransactionType: React.Dispatch<React.SetStateAction<TransactionType[]>>;
  setDataKategoriTransaksi: React.Dispatch<React.SetStateAction<CategoryType[]>>;
  dataTransactionType: TransactionType[];
  dataKategoriTransaksi: CategoryType[];
  setDate: React.Dispatch<React.SetStateAction<string | undefined>>;
  date: string | undefined;
  setAmount: React.Dispatch<React.SetStateAction<number | undefined>>;
  amount: number | undefined;
  setDescription: React.Dispatch<React.SetStateAction<string | undefined>>;
  description: string | undefined;
  setTransactionType: React.Dispatch<React.SetStateAction<number | undefined>>;
  setTransactionCategory: React.Dispatch<React.SetStateAction<number | undefined>>;
  setVendor: React.Dispatch<React.SetStateAction<VendorType | null>>;
  errors: typeSchmeTransactions;
}

export const Forms: React.FC<FormProps> = ({
  setDataKategoriTransaksi,
  setDataTransactionType,
  dataTransactionType,
  dataKategoriTransaksi,
  setDate,
  date,
  setAmount,
  amount,
  setDescription,
  setTransactionCategory,
  setTransactionType,
  errors,
}) => {
  useEffect(() => {
    const getTransactionType = async () => {
      try {
        const response = await clientApiRequest<{ data: TransactionType[] }>({
          url: '/transaction-type',
          method: 'GET',
        });

        setDataTransactionType(response.data);
      } catch (error) {
        console.error("Failed to fetch transaction types:", error);
      }
    };

    void getTransactionType(); // Use void to explicitly ignore the returned Promise
  }, [setDataTransactionType]);

  const handleChangeForTransactionType = async (value: string) => {
    try {
      setTransactionType(parseInt(value, 10));
      const response = await clientApiRequest<{ data: CategoryType[] }>({
        url: '/transaction-category',
        method: 'GET',
      });

      const filteredData = response.data.filter(
        (item: { transaction_type_id: string }) => item.transaction_type_id === value
      );

      setDataKategoriTransaksi(filteredData);
    } catch (error) {
      console.error("Failed to fetch transaction categories:", error);
    }
  };

  const handleChangeForTransactionCategory = (value: string) => {
    setTransactionCategory(parseInt(value, 10));
    console.log(value);
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <Label>Tanggal</Label>
        <Input
          onChange={(e) => setDate(e.target.value)}
          value={date}
          type="date"
          className="mt-2"
        />
        {errors?.date && <p className="text-red-500 mt-1 text-sm">{errors?.date}</p>}
      </div>
      <div>
        <Label>Jumlah</Label>
        <Input
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          value={amount}
          placeholder="jumlah transaksi"
          type="number"
          className="mt-2"
        />
        {errors?.amount && <p className="text-red-500 mt-1 text-sm">{errors?.amount}</p>}
      </div>
      <div className="space-y-2">
        <Label>Jenis Transaksi</Label>
        <Select onValueChange={(e) => void handleChangeForTransactionType(e)}>
          <SelectTrigger>
            <SelectValue placeholder="Jenis Transaksi" />
          </SelectTrigger>
          <SelectContent>
            {dataTransactionType.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors?.transaction_type_id && <p className="text-red-500 mt-1 text-sm">{errors?.transaction_type_id}</p>}
      </div>
      <div className="space-y-2">
        <Label>Kategori Transaksi</Label>
        <Select onValueChange={(e) => handleChangeForTransactionCategory(e)}>
          <SelectTrigger>
            <SelectValue placeholder="Kategori Transaksi" />
          </SelectTrigger>
          <SelectContent>
            {dataKategoriTransaksi.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors?.transaction_category_id && <p className="text-red-500 mt-1 text-sm">{errors?.transaction_category_id}</p>}
      </div>
      <div className="col-span-2 space-y-2">
        <Label>Supplier / Customer</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Supplier/Customer" />
          </SelectTrigger>
          <SelectContent></SelectContent>
        </Select>
      </div>
      <div className="col-span-2 space-y-2">
        <Label>Deskripsi</Label>
        <Textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Type your message here."
        />
        {errors?.description && <p className="text-red-500 mt-1 text-sm">{errors?.description}</p>}
      </div>
    </div>
  );
};
