import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "@/services/formatCurrency";
import { data } from "../page";

export const columns = (): ColumnDef<data>[] => {
    return [
        {
            accessorFn: (row) => row.transaction_category.name,
            id: "transaction_category",
            header: "Kategori Transaksi",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("transaction_category")}</div>
            ),
        },
        {
            accessorKey: "total_amount",
            header: "Jumlah transaksi",
            cell: ({ row }) => (
                <div className="capitalize">{formatCurrency({ value: row.getValue("total_amount") })}</div>
            ),
        },
        {
            accessorKey: "percentage",
            header: "Persentasi Transaksi",
            cell: ({ row }) => (
                <div className="capitalize flex gap-2 items-center justify-between">
                    <div className="w-full bg-gray-100 rounded-xl">
                        <div
                            style={{
                                width: `${row.getValue<number>("percentage")}%`,
                            }}
                            className=""
                        >
                            <div className="bg-primary rounded-xl flex justify-center h-2"></div>
                        </div>
                    </div>
                    <p>{row.getValue<number>("percentage")}%</p>
                </div>
            ),
        },
        {
            accessorKey: "amount",
            header: "Total anggaran",
            cell: ({ row }) => (
                <div className="capitalize">{formatCurrency({ value: row.getValue("amount") })}</div>
            ),
        },
    ];
};
