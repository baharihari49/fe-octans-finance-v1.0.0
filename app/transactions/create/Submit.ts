import { clientApiRequest } from "@/services/clientApiRequest";

// Define the vendor type
type VendorType = {
  id: number;
  name: string;
} | null;

// Define the data body structure
interface DataBody {
  date: string; // Use string for dates
  amount: number;
  descriptions: string; // Match the backend field name
  vendor_id: VendorType | null;
  transaction_category_id: number;
  transaction_type_id: number;
}

// Define the submit props type
interface SubmitProps {
  dataBody: DataBody;
}

// Define the response type (adjust based on the actual API response)
interface ApiResponse {
  status: number;
  message: string;
  data: any; // Replace `any` with a more specific type if known
}

export const Submit = async ({ dataBody }: SubmitProps): Promise<ApiResponse> => {
  try {
    // Explicitly type the response
    const response: ApiResponse = await clientApiRequest({
      url: "/transactions",
      method: "POST",
      body: dataBody,
    });

    return response;
  } catch (error) {
    console.error("Error during API call:", error);
    throw new Error("Failed to submit transaction");
  }
};
