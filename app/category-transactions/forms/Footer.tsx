/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-console */

import React from "react";
import { Submit } from "../create/Submit";
import { formSchmeaCategoryTransaction } from "./FooterSchema";

interface FooterProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
    setErrors: React.Dispatch<React.SetStateAction<any>>;
    name: string;
    selectTransactionType: number;
}

export const Footer: React. FC<FooterProps> = ({
    setOpen,
    setRefresh,
    setErrors,
    name,
    selectTransactionType
}) => {

    const handleClick = async () => {
        const dataBody = {
            name,
            transaction_type_id: selectTransactionType,
            is_show: 1,
            default: 0,
        }

        try {

            formSchmeaCategoryTransaction.parse(dataBody);

            const response = await Submit({ dataBody });
            if(response.status === 201) {
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
          }
        }
    }

    return (
        <button
            onClick={void handleClick}
            className="inline-flex h-[35px] items-center justify-center rounded bg-green4 px-[15px] font-medium leading-none text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 focus:outline-none"
        >
            Save changes
        </button>
    )
}