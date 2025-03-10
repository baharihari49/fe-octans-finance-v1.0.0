"use client";

import { useState, useEffect } from "react";
import { clientApiRequest } from "@/services/clientApiRequest";
import { DataTable } from "@/components/table/Table";
import { columns } from "./table/columns";
import { TableHeading } from "./table/TableHeading";

export type data = {
  name: string;
  id: string;
  default: number;
  transaction_type: { name: string };
};


const Page = () => {
  const [data, setData] = useState<data[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await clientApiRequest<{ data: data[] }>({
          url: "transaction-category",
          method: "GET",
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    void fetchData();
  }, [refresh]);

  const createColumns = columns({setRefresh});

  return (
    <>
      <DataTable<data>
        data={data}
        columns={createColumns}
        paramSearch="name"
        placeholderSearch="Cari berdasarkan nama"
        componenstHeading={
          <TableHeading setRefresh={setRefresh}/>
        }
      />
    </>
  );
};

export default Page;
