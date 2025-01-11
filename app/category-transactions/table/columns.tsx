import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "../edit/Edit";
import React, { Dispatch } from "react";

export type data = {
  name: string;
  id: string;
  default: number;
  transaction_type: { name: string };
};

interface ColumnsProps {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>> // Tambahkan props yang ingin diteruskan
}

export const columns = ({ setRefresh}: ColumnsProps): ColumnDef<data>[] => {
  return [
    {
      accessorKey: "name",
      header: "Nama",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorFn: (row) => row.transaction_type.name,
      id: "transaction_type",
      header: "Jenis Transaksi",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("transaction_type")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const data = row.original;

        return (
          <div className="py-1 text-right">
            {/* Gunakan parameter yang diteruskan */}
            <Edit 
              parameter={data.id} 
              setRefresh={setRefresh} 
              isDefault={data.default}
            />
          </div>
        );
      },
    },
  ];
};
