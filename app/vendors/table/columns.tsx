"use client"

import {
  ColumnDef,
} from "@tanstack/react-table"

import { vendorData } from "../dataType"


import { EyeOpenIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import Link from 'next/link'

export const columns: ColumnDef<vendorData>[] = [
  {
    accessorKey: "name_of_bisnis",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name_of_bisnis")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "email",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "no_hp",
    header: "Number phone",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("no_hp")}</div>
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
      const data = row.original
      return (
        <div className="py-1 text-right">
          <Link href={'/transactions/' + data.id}><Button className="rounded-full py-2 px-2.5"><EyeOpenIcon /></Button></Link>
        </div>
      )
    },
  },
]
