/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
import { Submit } from "../create/Submit";
import { formSchmeaTransaction } from "./FormSchema";
import { typeSchmeTransactions } from "./FormSchema";
import { ZodError } from "zod";

type VendorType = {
  id: number;
  name: string;
} | null;

interface FooterProps {
  date: string | undefined;
  amount: number | undefined;
  description: string | undefined;
  transactionType: number | undefined;
  transactionCategory: number | undefined;
  vendor: VendorType | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setErrors: React.Dispatch<React.SetStateAction<typeSchmeTransactions>>;
}

export const Footer: React.FC<FooterProps> = ({
  date,
  amount,
  description,
  transactionType,
  transactionCategory,
  vendor,
  setOpen,
  setRefresh,
  setErrors,
}) => {
  const handleClick = async () => {
    const dataBody = {
      date,
      amount,
      descriptions: description,
      vendor_id: vendor || null,
      transaction_category_id: transactionCategory,
      transaction_type_id: transactionType,
    };

    try {
      console.log("Submitting data:", dataBody);

      // Validate dataBody using Zod schema
      formSchmeaTransaction.parse(dataBody);

      const response = await Submit({ dataBody });

      if (response.status === 201) {
        setOpen(false);
        setRefresh((prevRefresh) => !prevRefresh);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const zodErrors = error.errors.reduce((acc: Partial<typeSchmeTransactions>, err) => {
          if (
            err.path &&
            err.path.length > 0 &&
            typeof err.message === "string" &&
            (err.path[0] as keyof typeSchmeTransactions) in acc
          ) {
            const key = err.path[0] as keyof typeSchmeTransactions;
            acc[key] = err.message as any; // Allow casting to any
          }
          return acc;
        }, {} as Partial<typeSchmeTransactions>);
        setErrors(zodErrors as typeSchmeTransactions);
      } else {
        console.error("Unexpected error occurred:", error);
      }
    }
  };

  return (
    <button
      onClick={() => void handleClick()}
      className="inline-flex h-[35px] items-center justify-center rounded bg-green4 px-[15px] font-medium leading-none text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 focus:outline-none"
    >
      Save changes
    </button>
  );
};
