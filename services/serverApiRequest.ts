import { cookies } from 'next/headers';

interface ApiClientParams {
  url: string; // Endpoint relatif dari API
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'; // Batasi metode HTTP yang valid
  body?: unknown; // Gunakan `unknown` untuk keamanan tipe
}

export const serverApiRequest = async <T>({ url, method, body }: ApiClientParams): Promise<T | null> => {
  try {
    // Ambil cookies dari Next.js headers
    const cookiesStore = await cookies(); // Await untuk mendapatkan cookies
    const token = cookiesStore.get('token')?.value;

    if (!token) {
      console.error('No token found');
      return null;
    }

    // Lakukan permintaan API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined, // Sertakan body jika ada
    });

    // Periksa apakah respons berhasil
    if (!response.ok) {
      console.error(`API Request Error: ${response.status} ${response.statusText}`);
      return null;
    }

    // Parsing data JSON dan mengembalikannya
    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};
