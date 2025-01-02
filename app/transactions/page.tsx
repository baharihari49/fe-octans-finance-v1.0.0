'use client';

import { DataTable } from "@/components/table/Table";
import { columns } from "./table/columns";
import { TableHeading } from "./table/TableHeading";
import { clientApiRequest } from "@/services/clientApiRequest";
import { useState, useEffect } from "react";

// Define the type for transaction data
type Transaction = {
  uuid: string;
  amount: number;
  date: string;
  transaction_type: { name: string };
  transaction_category: { name: string };
  vendor?: { name: string };
};

const Page = () => {
  const [data, setData] = useState<Transaction[]>([]); // Explicitly type the state
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Explicitly type the API response
        const response = await clientApiRequest<{ data: Transaction[] }>({
          url: 'transactions',
          method: 'GET',
        });

        setData(response.data); // Update state with typed data
      } catch (error) {
        console.error('Error fetching data:', error); // Log errors for debugging
      }
    };

    void fetchData(); // Use `void` to explicitly handle the Promise
  }, [refresh]); // Re-fetch data when `refresh` changes

  return (
    <>
      <DataTable
        data={data}
        columns={columns}
        paramSearch="no_transactions"
        placeholderSearch="Cari berdasarkan no transaksi"
        componenstHeading={
          <TableHeading setRefresh={setRefresh} />
        }
      />
    </>
  );
};

export default Page;
