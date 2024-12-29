"use client"

import {
  ColumnDef,
} from "@tanstack/react-table"


export type data = {
  uuid: string;
  amount: number;
  date: string;
  transaction_type: { name: string };
  transaction_category: { name: string };
  vendor?: { name: string };
}

import { EyeOpenIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import Link from 'next/link'


export const columns: ColumnDef<data>[] = [
  {
    accessorKey: "date",
    header: "Tanggal",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("date")}</div>
    ),
  },
  {
    accessorKey: "no_transactions",
    header: "No Transaksi",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("no_transactions")}</div>
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
    accessorKey: "amount",
    header: () => <div className="text-right">Jumlah</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="py-1 text-right">
          <Link href={'/transactions/' + data.uuid}><Button className="rounded-full py-2 px-2.5"><EyeOpenIcon /></Button></Link>
          
        </div>
      )
    },
  },
]