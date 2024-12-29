import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import axios from 'axios';

// Definisikan tipe data untuk respons pengguna
interface User {
  id: string;
  name: string;
  email: string;
  // Tambahkan properti lainnya sesuai dengan struktur data API Anda
}

interface ApiResponse {
  user: User;
}

export async function getServiceProvider(context: GetServerSidePropsContext) {
  const cookies = nookies.get(context);
  const token = cookies.token;

  if (!token) {
    // Jika tidak ada token, redirect ke halaman login
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    // Berikan tipe eksplisit pada respons axios
    const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      props: { user: response.data.user },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
}
