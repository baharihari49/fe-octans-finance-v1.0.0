import React from "react"

interface TableHeadingProps {
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

export const TableHeading: React.FC<TableHeadingProps> = ({
    setRefresh
}) => {
    return (
        <div>
            <h1>Table Heading</h1>
        </div>
    )
}