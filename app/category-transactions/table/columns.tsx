import { ColumnDef } from "@tanstack/react-table";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Edit } from "../edit/Edit";
import React, { Dispatch } from "react";

export type data = {
  name: string;
  id: string;
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
            />
          </div>
        );
      },
    },
  ];
};
