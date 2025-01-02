import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { clientApiRequest } from "@/services/clientApiRequest";
import { typeSchmeCategoryTransaction } from "./FooterSchema";

type TransactionType = { id: string; name: string;};

interface FormProps {
    setDataTransactionType: React.Dispatch<React.SetStateAction<TransactionType[]>>;
    dataTransactionType: TransactionType[];
    setName: React.Dispatch<React.SetStateAction<string>>;
    name: string;
    setSelectTransactionType: React.Dispatch<React.SetStateAction<number>>;
    selectTransactionType: number;
    errors: typeSchmeCategoryTransaction
}

export const Forms: React.FC<FormProps> = ({
    setDataTransactionType,
    dataTransactionType,
    setName,
    name,
    selectTransactionType,
    setSelectTransactionType,
    errors
}) => {

    useEffect(() => {
        const getTransactionType = async () => {
            try {
                const response = await clientApiRequest<{ data: TransactionType[] }>({
                    url: 'transaction-type',
                    method: 'GET'
                });
                setDataTransactionType(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        void getTransactionType();
    }, []);


    return (
        <div className="grid grid-cols-1 gap-3">
            <div>
                <Label>Nama</Label>
                <Input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    placeholder="Nama kategori transaksi"
                    className="mt-2"
                />
                {errors?.name && <p className="text-red-500 mt-1 text-sm">{errors?.name}</p>}
            </div>
            <div className="space-y-2">
                <Label>Jenis Transaksi</Label>
                <Select
                    onValueChange={(e) => setSelectTransactionType(Number(e))}
                >
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
        </div>
    )
}