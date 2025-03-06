/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-console */
import React from "react"
import { Submit } from "../create/Submit"
import { SubmitEdit } from "../edit/SubmitEdit"
import { formSchmeaCategoryBudgeting } from "./FormsSchema"
import { AlertDialogDelete } from "../delete/AlertDialog"
import { useState } from "react"

interface FooterProps {
    name: string
    value: number
    transactionTypeId: number
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
    isEdit?: boolean
    parameter: string
    setErrors: React.Dispatch<React.SetStateAction<any>>
}

export const Footer: React.FC<FooterProps> = ({
    name,
    value,
    transactionTypeId,
    setOpen,
    setRefresh,
    setIsEdit,
    isEdit,
    parameter,
    setErrors,
}) => {

    const [openAlert, setOpenAlert] = useState<boolean>(false);

    const handleClick = async () => {

        const dataBody = {
            name,
            value,
            transaction_type_id: transactionTypeId
        }

        if (isEdit) {
            try {
                const response = await SubmitEdit({ dataBody: { value, name }, parameter: parameter })

                if (response.status === 200) {
                    setOpen(false)
                    setRefresh((prevRefresh) => !prevRefresh)
                    setIsEdit(false)
                }

            } catch (error) {
                console.log(error)
            }
        } else {

            try {
                formSchmeaCategoryBudgeting.parse(dataBody)
                const response = await Submit({ dataBody: dataBody })

                if (response.status === 201) {
                    setOpen(false)
                    setRefresh((prevRefresh) => !prevRefresh)
                } else if (response.status === 400) {
                    setErrors({
                        value: response.message
                    })
                }

            } catch (validationError: any) {
                if (validationError.errors) {
                    const zodErrors = validationError.errors.reduce((acc: any, error: any) => {
                        acc[error.path[0]] = error.message;
                        return acc;
                    }, {});
                    setErrors(zodErrors)
                }
            }
        }

    }

    return (
        <>
            <div className="space-x-2">
                {isEdit && (
                    <AlertDialogDelete
                        setOpen={setOpenAlert}
                        open={openAlert}
                        setRefresh={setRefresh}
                        parameter={parameter}
                        setOpenDialog={setOpen}
                    />
                )}
                <button
                    onClick={() => void handleClick()}
                    className="inline-flex h-[35px] items-center justify-center rounded bg-green4 px-[15px] font-medium leading-none text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 focus:outline-none"
                >
                    Save changes
                </button>
            </div>
        </>
    )
}