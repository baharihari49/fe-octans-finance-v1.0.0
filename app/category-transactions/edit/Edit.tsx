import Modal from "@/components/modalDialog/Modal";
import { useState } from "react";
import { typeSchmeCategoryTransaction } from "../forms/FormsSchema";
import { ButtonEdit } from "./BtnEdit";
import { Forms } from "../forms/Forms";
import * as Dialog from "@radix-ui/react-dialog";
import { Footer } from "../forms/Footer";
interface EditProps {
    parameter: string
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Edit: React.FC<EditProps> = ({
    parameter,
    setRefresh,
 }) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [dataTransactionType, setDataTransactionType] = useState<{ id: string; name: string }[]>([]);
    const [name, setName] = useState<string>('');
    const [selectTransactionType, setSelectTransactionType] = useState<string>('0');
    const [errors, setErrors] = useState<typeSchmeCategoryTransaction>({ name: undefined, transaction_type_id: undefined });
    const [isEdit, setIsEdit] = useState<boolean>(false);
    
    return (
        <>
            <Modal
                setOpen={setOpenModal}
                open={openModal}
                modalTriger={<ButtonEdit 
                    setOpen={setOpenModal} 
                    setName={setName}
                    setSelectTransactionType={setSelectTransactionType}
                    parameter={parameter}
                    setIsEdit={setIsEdit}
                />}
                width="max-w-md"
                modalDescription="Edit kategori transaksi"
                modalHeading={<>
                    <Dialog.Title className="m-0 text-xl font-semibold text-mauve12">
                        Edit kategori transaksi
                    </Dialog.Title></>}
                modalBodyComponents={<Forms
                    setDataTransactionType={setDataTransactionType}
                    dataTransactionType={dataTransactionType}
                    name={name}
                    setName={setName}
                    setSelectTransactionType={setSelectTransactionType}
                    selectTransactionType={selectTransactionType}
                    errors={errors} />} 
                    modalFooter={<Footer
                        parameter={parameter}
                        setOpen={setOpenModal}
                        setErrors={setErrors}
                        setRefresh={setRefresh}
                        selectTransactionType={selectTransactionType}
                        name={name}
                        setIsEdit={setIsEdit}
                        isEdit={isEdit}
                    />}
            />
        </>
    )
}