/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "../ui/button"
import { Table } from "@tanstack/react-table"

type FooterProps = {
    table: Table<any>
}

export const Footer:React.FC<FooterProps> = ({table}) => {
    return (
        <>
            <div className="flex items-center justify-end space-x-2 p-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </>
    )
}