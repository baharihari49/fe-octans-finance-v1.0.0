import { clientApiRequest } from "@/services/clientApiRequest"

interface dataBody {
    name: string
    transaction_type_id: number
    default: number
    is_show: number
}

interface SubmitProps {
    dataBody: dataBody
}

interface ApiResponse {
    status: number;
    message: string;
    data: any; // Replace `any` with a more specific type if known
  }

export const Submit = async ({dataBody}: SubmitProps): Promise<ApiResponse> => {
    try{
        const response: ApiResponse = await clientApiRequest({
            url: 'transaction-category',
            method: 'POST',
            body: dataBody
        })

        return response
    } catch (error) {
        console.error("Error during API call:", error);
        throw new Error("Failed to submit transaction");
    }
}