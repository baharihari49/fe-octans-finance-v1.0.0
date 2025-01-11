'use client';
import { useState, useEffect } from "react";
import { Get } from "./categoryBudgeting/Get";
import { DataTable } from "@/components/table/Table";
import { clientApiRequest } from "@/services/clientApiRequest";
import { columns } from "./table/columns";

export interface data {
    transaction_category: {name: string, amount: string, transaction_type_id: number}
    total_amount: string
    percentage: number
    amount: number
}

const Page = () => {
    const [dataKebutuhan, setDataKebutuhan] = useState<data[]>([])
    const [dataKeinginan, setDataKeinginan] = useState<data[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await clientApiRequest<{data: data[]}>({
                    url: "budgetings",
                    method: "GET",
                })
                const newDataKebutuhan = response.data.filter((item) => item.transaction_category.transaction_type_id == 3)
                const newDataKeinginan = response.data.filter((item) => item.transaction_category.transaction_type_id == 4) 
                setDataKebutuhan(newDataKebutuhan)
                setDataKeinginan(newDataKeinginan)
            } catch (error) {
                console.log(error);
            }
        }
        void fetchData();
    }, [])

    const coloumns = columns()

    return (
        <>
            <Get />
            <div className="flex gap-4 mt-5">
                <DataTable
                    data={dataKebutuhan}
                    columns={coloumns}
                    componenstHeading={undefined}
                    paramSearch="transaction_category"
                    placeholderSearch={"Cari berdasarkan nama"}
                />
                <DataTable
                    data={dataKeinginan}
                    columns={coloumns}
                    componenstHeading={undefined}
                    paramSearch="transaction_category"
                    placeholderSearch={"Cari berdasarkan nama"}
                />
            </div>
        </>
    )
}

export default Page;