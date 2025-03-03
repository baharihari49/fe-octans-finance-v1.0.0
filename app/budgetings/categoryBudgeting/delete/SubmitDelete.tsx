import { clientApiRequest } from "@/services/clientApiRequest";

interface ApiResponse {
    status: number;
    message: string;
    data: any; // Replace `any` with a more specific type if known
  }

export const SubmitDelete = async ({ parameter }: { parameter: string }) => {
    try {
        const response: ApiResponse = await clientApiRequest({
            url: `category-budgetting`,
            method: 'DELETE',
            parameter: parameter
        })
        return response
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
}