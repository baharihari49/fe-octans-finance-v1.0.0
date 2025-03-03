import {clientApiRequest} from '@/services/clientApiRequest'


interface dataBody {
    name: string
    value: number
    transaction_type_id: number
}

interface SubmitProps {
    dataBody: dataBody
}

interface ApiResponse {
    status: number;
    message: string;
    data: any; // Replace `any` with a more specific type if known
  }
  

export const Submit = async ({ dataBody }: SubmitProps): Promise<ApiResponse> => {
    try {
        const response: ApiResponse = await clientApiRequest({
            url: 'category-budgetting',
            method: 'POST',
            body: dataBody
        })

        return response
    } catch (error) {
        console.error('Error during API call:', error)
        throw new Error('Failed to submit category budgeting')
    }
}