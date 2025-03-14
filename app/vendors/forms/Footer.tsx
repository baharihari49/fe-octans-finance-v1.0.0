/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-console */

import React from "react";
import { SubmitCreate } from "../create/Submit";
// import { SubmitEdit } from "../edit/Submit";
// import { SubmitDelete } from "../delete/submit";
import { formSchemaVendor } from "./FormsSchema";
import { Button } from "@/components/ui/button";
// import { AlertDialogDelete } from "@/app/category-transactions/delete/AlertDialog";
import { useState } from "react";

interface FooterProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    refetch: () => void
    setErrors: React.Dispatch<React.SetStateAction<any>>;
    name: string;
    selectTransactionType: string;
    parameter: string;
    email: string
    address: string
    numberPhone: string
    setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
    isEdit?: boolean;
    labelBtn: string;
}

export const Footer: React.FC<FooterProps> = ({
    setOpen,
    refetch,
    setErrors,
    name,
    email,
    numberPhone,
    address,
    selectTransactionType,
    parameter,
    setIsEdit,
    isEdit,
    labelBtn
}) => {

    const [openAlert, setOpenAlert] = useState<boolean>(false);

    const handleClick = async () => {

        if (isEdit) {
            // const dataBody = {
            //     name,
            //     transaction_type_id: Number(selectTransactionType),
            //     is_show: 1,
            //     default: 0,
            // };
            // try {
            //     formSchmeaCategoryTransaction.parse(dataBody);
            //     const response = await SubmitEdit({ dataBody, parameter });
            //     if (setIsEdit) setIsEdit(false); // Pastikan setIsEdit ada sebelum memanggilnya
            //     if (response.status === 200) {
            //         setOpen(false);
            //         setRefresh((prevRefresh) => !prevRefresh);
            //     }
            // } catch (validationError: any) {
            //     if (validationError.errors) {
            //         const zodErrors = validationError.errors.reduce((acc: any, error: any) => {
            //             acc[error.path[0]] = error.message;
            //             return acc;
            //         }, {});

            //         setErrors(zodErrors); // Set error ke state
            //     }
            // }
        } else {
            const dataBody = {
                "name_of_bisnis": name,
                "no_hp": numberPhone,
                "email": email,
                "transaction_type_id": Number(selectTransactionType),
                "address": address,
            }

            try {
                // Validasi data sebelum membuat
                console.log(dataBody)
                formSchemaVendor.parse(dataBody);

                const response = await SubmitCreate({ dataBody });
                if (response.status === 201) {
                    setOpen(false);
                    refetch()
                }
            } catch (validationError: any) {
                if (validationError.errors) {
                    const zodErrors = validationError.errors.reduce((acc: any, error: any) => {
                        acc[error.path[0]] = error.message;
                        return acc;
                    }, {});

                    setErrors(zodErrors); // Set error ke state
                }
            }
        }
    };



    return (
        <>
            <div className="space-x-3">
                {/* {isEdit && (
                    <AlertDialogDelete 
                        open={openAlert} 
                        setOpen={setOpenAlert}
                        setRefresh={setRefresh}
                        parameter={parameter}
                    />
                )} */}
                <Button
                    onClick={() => void handleClick()}>
                    {labelBtn}
                </Button>
            </div>
        </>
    );
};
