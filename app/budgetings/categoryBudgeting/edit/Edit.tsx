import Modal from "@/components/modalDialog/Modal"
import { BtnEdit } from "./BtnEdit"
import React from "react"
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { Forms } from "../forms/Forms";
import { Footer } from "../forms/Footer";
import { typeSchmeCategoryBudgeting } from "../forms/FormsSchema";

interface EditProps {
    setValue: React.Dispatch<React.SetStateAction<number>>
    value: number
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
    isEdit: boolean,
    parameter:  string
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
    setErrors: React.Dispatch<React.SetStateAction<any>>
    errors: typeSchmeCategoryBudgeting
}


export const Edit: React.FC<EditProps> = ({
    setValue,
    value,
    setIsEdit,
    isEdit,
    parameter,
    name,
    setName,
    setRefresh,
    errors,
    setErrors
}) => {

    const [open, setOpen] = useState<boolean>(false)

    return (
        <>
            <Modal
                modalBodyComponents={<Forms 
                    value={value} 
                    setValue={setValue}
                    errors={errors}
                />}
                modalTriger={<BtnEdit
                    setOpen={setOpen}
                    setIsEdit={setIsEdit}
                    setName={setName}
                    setValue={setValue}
                    parameter={parameter}
                />}
                modalHeading={<Dialog.Title className="m-0 text-xl font-semibold text-mauve12">
                    Edit kategori anggaran
                </Dialog.Title>}
                modalFooter={<Footer
                    setIsEdit={setIsEdit}
                    isEdit={isEdit} 
                    name={name} 
                    value={value} 
                    transactionTypeId={0} 
                    parameter={parameter}
                    setOpen={setOpen} 
                    setRefresh={setRefresh}    
                    setErrors={setErrors}
                />}
                open={open}
                setOpen={setOpen}
                modalDescription={"Edit kategori anggaran"}
                width="max-w-sm"
            />
        </>
    )
}