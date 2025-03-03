import { Pencil2Icon } from "@radix-ui/react-icons"
import React from "react"
import { clientApiRequest } from "@/services/clientApiRequest";

interface BtnEditProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
    setName: React.Dispatch<React.SetStateAction<string>>
    setValue: React.Dispatch<React.SetStateAction<number>>
    parameter: string
}

interface ApiResponse {
    data: {
        name: string
        transaction_type_id: number
        value: number
        id: string
    }
}

export const BtnEdit: React.FC<BtnEditProps> = ({
    setOpen,
    setIsEdit,
    setName,
    setValue,
    parameter
}) => {

    const handleClicked = async () => {
        setOpen(true)
        setIsEdit(true)

        try {
            const response: ApiResponse = await clientApiRequest({
                url: 'category-budgetting',
                method: 'GET',
                parameter: parameter
            })
            setName(response.data.name)
            setValue(response.data.value)
        } catch (error) {
            throw new Error("Failed to fetch data");
        }

    }

    return (
        <Pencil2Icon onClick={() => void handleClicked()} />
    )
}