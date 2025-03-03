import Modal from "@/components/modalDialog/Modal"
import React from "react"
import * as Dialog from "@radix-ui/react-dialog";
import { Forms } from "../forms/Forms";
import { Footer } from "../forms/Footer";
import { typeSchmeCategoryBudgeting } from "../forms/FormsSchema";

interface createProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    name: string
    transactionTypeId: number
    value: number
    setValue: React.Dispatch<React.SetStateAction<number>>
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
    setErrors: React.Dispatch<React.SetStateAction<typeSchmeCategoryBudgeting>>
    errors: typeSchmeCategoryBudgeting
}

export const Create: React.FC<createProps> = ({
    open,
    setOpen,
    name,
    transactionTypeId,
    value,
    setValue,
    setRefresh,
    setErrors,
    errors
}) => {
    return (
        <>
            <Modal
                modalBodyComponents={<Forms 
                    value={value}
                    setValue={setValue}
                    errors={errors}
                />}
                modalTriger={undefined}
                modalHeading={<Dialog.Title className="m-0 text-xl font-semibold text-mauve12">
                    Buat kategori anggaran
                </Dialog.Title>}
                modalFooter={<Footer 
                    name={name}
                    transactionTypeId={transactionTypeId}
                    value={value}
                    setOpen={setOpen}
                    setRefresh={setRefresh}
                    setErrors={setErrors}
                    setIsEdit={function (value: React.SetStateAction<boolean>): void {
                        throw new Error("Function not implemented.");
                    } } 
                    parameter={""}                />}
                open={open}
                setOpen={setOpen}
                modalDescription={"Buat kategori anggaran baru"}
                width="max-w-sm"
            />
        </>
    )
}