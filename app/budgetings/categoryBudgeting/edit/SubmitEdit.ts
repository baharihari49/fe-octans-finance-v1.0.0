import {clientApiRequest} from '@/services/clientApiRequest'


interface dataBody {
    value: number
    name: string
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
  

export const SubmitEdit = async ({ dataBody, parameter }: SubmitProps): Promise<ApiResponse> => {
    try {
        const response: ApiResponse = await clientApiRequest({
            url: 'category-budgetting',
            method: 'PUT',
            body: dataBody,
            parameter: parameter
        })

        return response
    } catch (error) {
        console.error('Error during API call:', error)
        throw new Error('Failed to submit category budgeting')
    }
}