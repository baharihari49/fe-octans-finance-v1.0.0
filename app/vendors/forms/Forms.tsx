import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React from "react";
import { TypeSchemaVendor } from "./FormsSchema";

type TransactionType = { id: string; name: string; };

interface FormProps {
    setDataTransactionType: React.Dispatch<React.SetStateAction<TransactionType[]>>;
    dataTransactionType: TransactionType[];
    setName: React.Dispatch<React.SetStateAction<string>>;
    name: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>
    email: string
    setNumberPhone: React.Dispatch<React.SetStateAction<string>>
    numberPhone: string
    setAddress: React.Dispatch<React.SetStateAction<string>>
    address: string
    setSelectTransactionType: React.Dispatch<React.SetStateAction<string>>;
    selectTransactionType: string;
    errors: TypeSchemaVendor
}

export const Forms: React.FC<FormProps> = ({
    setDataTransactionType,
    dataTransactionType,
    setName,
    name,
    selectTransactionType,
    setSelectTransactionType,
    errors,
    email,
    setEmail,
    numberPhone,
    setNumberPhone,
    address,
    setAddress,
}) => {

    // useEffect(() => {
    //     const getTransactionType = async () => {
    //         try {
    //             const response = await clientApiRequest<{ data: TransactionType[] }>({
    //                 url: 'transaction-type',
    //                 method: 'GET'
    //             });
    //             setDataTransactionType(response.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     void getTransactionType();
    // }, []);


    return (
        <div className="grid grid-cols-2 gap-3">
            <div>
                <Label>Nama</Label>
                <Input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    placeholder="Nama kategori transaksi"
                    className="mt-2"
                />
                {errors?.name_of_bisnis && <p className="text-red-500 mt-1 text-sm">{errors?.name_of_bisnis}</p>}
            </div>
            <div>
                <Label>Email</Label>
                <Input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    placeholder="Nama kategori transaksi"
                    className="mt-2"
                />
                {errors?.email && <p className="text-red-500 mt-1 text-sm">{errors?.email}</p>}
            </div>
            <div>
                <Label>Alamat</Label>
                <Input
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    type="text"
                    placeholder="Nama kategori transaksi"
                    className="mt-2"
                />
                {errors?.address && <p className="text-red-500 mt-1 text-sm">{errors?.address}</p>}
            </div>
            <div>
                <Label>Nomor handphone</Label>
                <Input
                    onChange={(e) => setNumberPhone(e.target.value)}
                    value={numberPhone}
                    type="text"
                    placeholder="Nama kategori transaksi"
                    className="mt-2"
                />
                {errors?.no_hp && <p className="text-red-500 mt-1 text-sm">{errors?.no_hp}</p>}
            </div>
            <div className="space-y-2">
                <Label>Jenis Transaksi</Label>
                <Select
                    value={selectTransactionType}
                    onValueChange={(e) => setSelectTransactionType(e)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Jenis Transaksi" />
                    </SelectTrigger>
                    <SelectContent>
                        {dataTransactionType?.map((item) => (
                            <SelectItem key={item.id} value={item.id.toString()}>
                                {item.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors?.no_hp && <p className="text-red-500 mt-1 text-sm">{errors?.transaction_type_id}</p>}
            </div>
        </div>
    )
}