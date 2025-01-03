import { Pencil2Icon } from "@radix-ui/react-icons";
import { clientApiRequest } from "@/services/clientApiRequest";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface BtnEditProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    setName: React.Dispatch<React.SetStateAction<string>>
    setSelectTransactionType: React.Dispatch<React.SetStateAction<string>>
    parameter: string
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ApiResponse {
    data: {
        name: string
        transaction_type_id: number
    }
}

export const ButtonEdit: React.FC<BtnEditProps> = ({
    setOpen,
    setName,
    setSelectTransactionType,
    parameter,
    setIsEdit
}) => {

    const handleClicked = async () => {
        setOpen(true)
        try {
            const response: ApiResponse = await clientApiRequest({
                url: 'transaction-category',
                method: 'GET',
                parameter: parameter
            })
            setName(response.data.name)
            setIsEdit(true)
            setSelectTransactionType(response.data.transaction_type_id.toString())
        } catch (error) {
            throw new Error("Failed to fetch data");
        }
    }

    return (
        <>
            <TooltipProvider delayDuration={200}>
                <Tooltip>
                    <TooltipTrigger>
                        <div className="p-2 bg-gray-100 rounded-md" onClick={() => void handleClicked()}>
                            <Pencil2Icon className="text-primary"/>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="top">Klik 2 kali ketika halam pertama kali di muat</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    )
}