import { useQuery } from "@tanstack/react-query";
import { clientApiRequest } from "@/services/clientApiRequest";

interface DataType {
    id: string
    name: string
}

interface ApiResponse {
    status: number
    data: DataType[]
    message: string
}

const fetchUrls = async (): Promise<ApiResponse> => {
  try {
    return await clientApiRequest<ApiResponse>({
      method: "GET",
      url: "transaction-type",
    });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    throw new Error("Failed to fetch URLs");
  }
};

// ✅ Hook React Query untuk mengambil URL + Link Preview
export const useGetTransactionType = () => {
  return useQuery<ApiResponse>({
    queryKey: ["transactionType"], // Key unik untuk caching
    queryFn: fetchUrls,
    staleTime: 1000 * 60 * 5, // Data akan dianggap fresh selama 5 menit
    refetchOnWindowFocus: false, // Tidak auto-refresh saat pindah tab
  });
};
