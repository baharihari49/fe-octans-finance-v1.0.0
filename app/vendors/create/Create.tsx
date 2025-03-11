import Modal from "@/components/modalDialog/Modal"
import { useEffect, useState } from "react";
import { Heading } from "./Heading";
import { ButtonCreate } from "./BtnCreate";
import { Forms } from "../forms/Forms";
import { Footer } from "../forms/Footer";
import { useGetTransactionType } from "@/hooks/useGetTransactionType";
import { TypeSchemaVendor } from "../forms/FormsSchema";

interface CreateProps {
    refetch: () => void
}

export const Create: React.FC<CreateProps> = ({ refetch }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [numberPhone, setNumberPhone] = useState<string>('');
    const [selectTransactionType, setSelectTransactionType] = useState<string>('0');
    const [dataTransactionType, setDataTransactionType] = useState<{ id: string; name: string }[]>([]);
    const [errors, setErrors] = useState<TypeSchemaVendor>({ 
        name_of_bisnis: undefined, 
        transaction_type_id: undefined,
        email: undefined,
        no_hp: undefined,
        address: undefined 
    });

    const { data } = useGetTransactionType();

    useEffect(() => {
        if (data?.data) {
            setDataTransactionType(data.data);
        }
    }, [data]);

    return (
        <>
            <Modal
                modalBodyComponents={
                    <Forms
                        setDataTransactionType={setDataTransactionType}
                        dataTransactionType={dataTransactionType}
                        setName={setName}
                        name={name}
                        setEmail={setEmail}
                        email={email}
                        setNumberPhone={setNumberPhone}
                        numberPhone={numberPhone}
                        setAddress={setAddress}
                        address={address}
                        setSelectTransactionType={setSelectTransactionType}
                        selectTransactionType={selectTransactionType}
                        errors={errors}
                    />
                }
                modalTriger={<ButtonCreate setOpen={setOpen} />}
                modalHeading={<Heading />}
                modalFooter={<Footer
                    setOpen={setOpen}
                    refetch={refetch}
                    setErrors={setErrors}
                    name={name}
                    email={email}
                    address={address}
                    numberPhone={numberPhone}
                    selectTransactionType={selectTransactionType}
                    parameter={""}
                    labelBtn={"Tambah vendor"}
                    isEdit={false}
                />}
                open={open}
                setOpen={setOpen}
                modalDescription={'Tambah vendor baru'}
                width="max-w-2xl"
            />
        </>
    );
};
