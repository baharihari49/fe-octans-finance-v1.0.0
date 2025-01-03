import React from "react"
import { Create } from "../create/Create"

interface TableHeadingProps {
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

export const TableHeading: React.FC<TableHeadingProps> = ({
    setRefresh,
   
}) => {
    return (
        <div>
            <Create 
                setRefresh={setRefresh} 
            />
        </div>
    )
}