// lib/getServiceProvider.ts
import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import axios from 'axios';

export async function getServiceProvider(context: GetServerSidePropsContext) {
  const cookies = nookies.get(context);
  const token = cookies.token;

  if (!token) {
    // If no token, return null and redirect
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
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
