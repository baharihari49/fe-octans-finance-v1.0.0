'use client';

import Modal from "@/components/modalDialog/Modal";
import { ButtonCreate } from "./BtnCreat";
import { Heading } from "./Heading";
import { Forms } from "../form/Forms";
import { Footer } from "../form/Footer";
import { useState } from "react";
import { typeSchmeTransactions } from "../form/FormSchema";

// Define vendor type
type VendorType = {
  id: number;
  name: string;
} | null;

interface CreateProps {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Create: React.FC<CreateProps> = ({ setRefresh }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<string | undefined>(undefined);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [transactionType, setTransactionType] = useState<number | undefined>(undefined);
  const [transactionCategory, setTransactionCategory] = useState<number | undefined>(undefined);
  const [errors, setErrors] = useState<typeSchmeTransactions>({ date: undefined, amount: undefined, description: undefined, transaction_type_id: undefined, transaction_category_id: undefined });
  const [vendor, setVendor] = useState<VendorType>(null);
  const [dataTransactionType, setDataTransactionType] = useState<
    { id: string; name: string }[]
  >([]);
  const [dataKategoriTransaksi, setDataKategoriTransaksi] = useState<
    { id: string; name: string; transaction_type_id: string; }[]
  >([]);

  return (
    <>
      <Modal
        modalHeading={<Heading />}
        modalTriger={<ButtonCreate setOpen={setOpen} />}
        open={open}
        setOpen={setOpen}
        modalBodyComponents={
          <Forms
            setDataKategoriTransaksi={setDataKategoriTransaksi}
            setDataTransactionType={setDataTransactionType}
            dataKategoriTransaksi={dataKategoriTransaksi}
            dataTransactionType={dataTransactionType}
            setDate={setDate}
            date={date}
            setAmount={setAmount}
            amount={amount}
            setDescription={setDescription}
            description={description}
            setTransactionCategory={setTransactionCategory}
            setTransactionType={setTransactionType}
            setVendor={setVendor}
            errors={errors}
          />
        }
        modalFooter={
          <Footer
            date={date}
            amount={amount}
            description={description}
            transactionCategory={transactionCategory}
            transactionType={transactionType}
            vendor={vendor}
            setOpen={setOpen}
            setRefresh={setRefresh}
            setErrors={setErrors}
          />
        }
      />
    </>
  );
};
