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
    isDefault: number
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
    setIsEdit,
    isDefault
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
            {isDefault === 0 && (
                <TooltipProvider delayDuration={200}>
                    <Tooltip>
                        <TooltipTrigger>
                            <div className="p-2 bg-gray-100 rounded-md" onClick={() => void handleClicked()}>
                                <Pencil2Icon className="text-primary" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="top">Klik untuk mengedit</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
            {isDefault === 1 && (
                 <TooltipProvider delayDuration={200}>
                 <Tooltip>
                     <TooltipTrigger>
                         <div className="p-2 bg-gray-100 rounded-md cursor-not-allowed">
                             <Pencil2Icon className="text-gray-500"/>
                         </div>
                     </TooltipTrigger>
                     <TooltipContent side="top">Kategori transaksi bawaan tidak dapat di ubah</TooltipContent>
                 </Tooltip>
             </TooltipProvider>
            )}
        </>
    )
}