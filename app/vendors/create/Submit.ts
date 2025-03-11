import { clientApiRequest } from "@/services/clientApiRequest"

interface dataBody {
    name_of_bisnis: string
    transaction_type_id: number
    address: string
    email: string
    no_hp: string
}

interface SubmitProps {
    dataBody: dataBody
}

interface ApiResponse {
    status: number;
    message: string;
    data: any; // Replace `any` with a more specific type if known
  }

export const SubmitCreate = async ({dataBody}: SubmitProps): Promise<ApiResponse> => {
    try{
        const response: ApiResponse = await clientApiRequest({
            url: 'vendors',
            method: 'POST',
            body: dataBody
        })

        return response
    } catch (error) {
        throw new Error("Failed to submit transaction");
    }
}