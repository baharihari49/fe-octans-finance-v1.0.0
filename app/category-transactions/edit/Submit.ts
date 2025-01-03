import { clientApiRequest } from "@/services/clientApiRequest";

interface dataBody {
    name: string
    transaction_type_id: number
    default: number
    is_show: number
}


interface SubmitProps {
    dataBody: dataBody
    parameter: string
}

interface ApiResponse {
    status: number;
    message: string;
    data: any; // Replace `any` with a more specific type if known
}
export const SubmitEdit= async ({dataBody, parameter}: SubmitProps): Promise<ApiResponse> => {
    try{
        const response: ApiResponse = await clientApiRequest({
            url: 'transaction-category',
            method: 'PUT',
            body: dataBody,
            parameter: parameter
        })


        return response
    } catch (error) {
        throw new Error("Failed to submit transaction");
    }
}