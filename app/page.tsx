// app/page.tsx
import { serverApiRequest } from '@/services/serverApiRequest';

// Define the type for the user data
interface User {
  name: string;
  email: string;
}

// Mark the page as dynamic to support runtime behaviors like cookies
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  try {
    // Explicitly type the user data and handle null response
    const user = await serverApiRequest<User | null>({
      url: '/user',
      method: 'GET',
    });

    // Check if the user is null
    if (!user) {
      return (
        <div>
          <h1>Error</h1>
          <p>Unable to load user data. Please check your connection or login again.</p>
        </div>
      );
    }

    return (
      <div>
        <h1>Welcome, {user.name}</h1>
        <p>Email: {user.email}</p>
      </div>
    );
  } catch (error) {
    console.error('Error fetching user data:', error);
    return (
      <div>
        <h1>Error</h1>
        <p>Unable to load user data. Please check your connection or login again.</p>
      </div>
    );
  }
}
