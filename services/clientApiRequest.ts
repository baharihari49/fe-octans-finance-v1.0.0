interface ApiClientParams {
    url: string; // Relative URL to append to the base URL
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'; // Limit valid HTTP methods
    body?: unknown; // Use `unknown` instead of `any` for better type safety
  }
  
  export const clientApiRequest = async <T>({ url, method, body }: ApiClientParams): Promise<T> => {
    try {
      // Fetch the token from the auth endpoint
      const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL_INTERNAL}/api/auth/get-token`);
  
      if (!tokenResponse.ok) {
        console.error(`Token fetch failed: ${tokenResponse.status} ${tokenResponse.statusText}`);
        throw new Error(`Token fetch failed with status ${tokenResponse.status}`);
      }
  
      const tokenData = await tokenResponse.json();
      const token = tokenData.token;
  
      if (!token) {
        console.error('No token found in the response');
        throw new Error('No token found in the response');
      }
  
      // Make the main API request
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined, // Include the body if provided
      });
  
      if (!response.ok) {
        console.error(`API request failed: ${response.status} ${response.statusText}`);
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      const data: T = await response.json(); // Explicitly type the response as `T`
      return data;
    } catch (error) {
      console.error('Error in clientApiRequest:', error);
      throw error; // Rethrow the error for better error handling upstream
    }
  };
  