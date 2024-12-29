import React from "react";
import { Submit } from "../create/Submit";

type VendorType = {
  id: number;
  name: string;
} | null;

interface FooterProps {
  date: string;
  amount: number;
  description: string;
  transactionType: number;
  transactionCategory: number;
  vendor: VendorType | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
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
}) => {
  const handleClick = async () => {
    try {
      const dataBody = {
        date,
        amount,
        descriptions: description,
        vendor_id: vendor,
        transaction_category_id: transactionCategory,
        transaction_type_id: transactionType,
      };

      // Explicitly type the response
      const response = await Submit({ dataBody });

      if (response.status === 201) {
        setOpen(false);
        setRefresh((prevRefresh) => !prevRefresh);
      }
    } catch (error) {
      console.error("Error while submitting:", error);
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
