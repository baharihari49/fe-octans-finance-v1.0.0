
import Modal from "@/components/modalDialog/Modal";
import React, { useState } from "react";
import { Heading } from "./Heading";
import { ButtonCreate } from "./BtnCreate";
import { Forms } from "../forms/Forms";
import { Footer } from "../forms/Footer";
import { typeSchmeCategoryTransaction } from "../forms/FormsSchema";

interface CreateProps {
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Create: React.FC<CreateProps> = ({
    setRefresh,
}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [dataTransactionType, setDataTransactionType] = useState<{ id: string; name: string }[]>([]);
    const [name, setName] = useState<string>('');
    const [selectTransactionType, setSelectTransactionType] = useState<string>('0');
    const [errors, setErrors] = useState<typeSchmeCategoryTransaction>({ name: undefined, transaction_type_id: undefined });

    return (
        <>
            <Modal
                open={open}
                setOpen={setOpen}
                modalTriger={<ButtonCreate setOpen={setOpen}/>}
                modalHeading={<Heading />}
                width="max-w-md"
                modalDescription="Tambah kategori transaksi baru"
                modalBodyComponents={
                    <Forms
                        setDataTransactionType={setDataTransactionType}
                        dataTransactionType={dataTransactionType}
                        name={name}
                        setName={setName}
                        setSelectTransactionType={setSelectTransactionType}
                        selectTransactionType={selectTransactionType}
                        errors={errors}
                    />
                }
                modalFooter={<Footer
                    setOpen={setOpen}
                    setRefresh={setRefresh}
                    setErrors={setErrors}
                    name={name}
                    selectTransactionType={selectTransactionType}
                    parameter=""
                    isEdit={false}
                    labelBtn="Tambah Kategori"
                />}
            />
        </>
    );
}