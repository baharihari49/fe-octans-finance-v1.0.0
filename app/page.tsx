// app/page.tsx
import { serverApiRequest } from '@/services/serverApiRequest';

export default async function DashboardPage() {
  const user = await serverApiRequest({
    url: '/user',
    method: 'GET',
  });

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
}
