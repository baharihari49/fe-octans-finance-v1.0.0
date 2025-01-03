/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-console */

import React from "react";
import { SubmitCreate } from "../create/Submit";
import { SubmitEdit } from "../edit/Submit";
import { formSchmeaCategoryTransaction } from "./FormsSchema";

interface FooterProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
    setErrors: React.Dispatch<React.SetStateAction<any>>;
    name: string;
    selectTransactionType: string;
    parameter: string;
    setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
    isEdit?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
    setOpen,
    setRefresh,
    setErrors,
    name,
    selectTransactionType,
    parameter,
    setIsEdit,
    isEdit,
}) => {
    const handleClick = async () => {
        if (isEdit) {
            const dataBody = {
                name,
                transaction_type_id: Number(selectTransactionType),
                is_show: 1,
                default: 1,
            };
            try {
                formSchmeaCategoryTransaction.parse(dataBody);
                const response = await SubmitEdit({ dataBody, parameter });
                if (setIsEdit) setIsEdit(false); // Pastikan setIsEdit ada sebelum memanggilnya
                if(response.status === 200) {
                    setOpen(false);
                    setRefresh((prevRefresh) => !prevRefresh);
                }
            } catch (validationError: any) {
                if (validationError.errors) {
                    const zodErrors = validationError.errors.reduce((acc: any, error: any) => {
                        acc[error.path[0]] = error.message;
                        return acc;
                    }, {});

                    setErrors(zodErrors); // Set error ke state
                } else {
                    console.error("Unexpected validation error:", validationError); // Log error tidak terduga
                }
            }
        } else {
            const dataBody = {
                name,
                transaction_type_id: selectTransactionType,
                is_show: 1,
                default: 0,
            };

            try {
                // Validasi data sebelum membuat
                formSchmeaCategoryTransaction.parse(dataBody);

                const response = await SubmitCreate({ dataBody });
                if (response.status === 201) {
                    setOpen(false);
                    setRefresh((prevRefresh) => !prevRefresh);
                }
            } catch (validationError: any) {
                if (validationError.errors) {
                    const zodErrors = validationError.errors.reduce((acc: any, error: any) => {
                        acc[error.path[0]] = error.message;
                        return acc;
                    }, {});

                    setErrors(zodErrors); // Set error ke state
                } else {
                    console.error("Unexpected validation error:", validationError); // Log error tidak terduga
                }
            }
        }
    };

    return (
        <button
            onClick={() => void handleClick()} // Gunakan langsung tanpa `void`
            className="inline-flex h-[35px] items-center justify-center rounded bg-green4 px-[15px] font-medium leading-none text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 focus:outline-none"
        >
            Save changes
        </button>
    );
};
