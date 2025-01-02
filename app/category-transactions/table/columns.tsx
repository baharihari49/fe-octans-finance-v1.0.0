import { ColumnDef } from "@tanstack/react-table";

export type data = {
  name: string;
  id: string;
};

export const columns: ColumnDef<data>[] = [
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
];
