"use client"

import React from "react"
import { Create } from "../create/Create"

interface TableHeadingProps {
    refetch: () => void
}

export const TableHeading: React.FC <TableHeadingProps> = ({
    refetch
}) => {
    return (
        <>
            <div>
                <Create refetch={refetch}/>
            </div>
        </>
    )
}