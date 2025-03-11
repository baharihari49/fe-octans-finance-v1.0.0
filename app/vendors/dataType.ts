export interface TransactionType {
    id: number;
    name: string;
    created_at: string | null;
    updated_at: string | null;
  }
  
  export interface vendorData {
    id: number;
    name_of_bisnis: string;
    address: string;
    email: string;
    no_hp: string;
    transaction_type_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    transaction_type: TransactionType;
  }
  
  export interface ApiResponse {
    status: number;
    data: vendorData[];
    message: string;
  }
  