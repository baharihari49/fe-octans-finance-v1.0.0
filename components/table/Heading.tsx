/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuCheckboxItem
} from "../ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { Table } from "@tanstack/react-table"; // Import the correct type from react-table

type HeadingProps = {
    table: Table<any>
    children: any
    paramSearch: string
    placholderSearch: string
}

export const Heading: React.FC<HeadingProps> = ({ 
    table,
    children,
    paramSearch,
    placholderSearch
 }) => {
    return (
        <>
            <div className="flex justify-between items-center p-4">
                <Input
                    placeholder={placholderSearch}
                    value={(table.getColumn(paramSearch)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(paramSearch)?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <div className="flex items-center gap-3">
                    {children}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </>
    )
}