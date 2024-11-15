interface ApiClientParams {
    url: string;
    method: string;
    body?: any;
}

export const clientApiRequest = async ({ url, method, body }: ApiClientParams) => {

    const response = await fetch('api/auth/get-token')

    const data = await response.json()

    const token = data.token

    if (!token) {
        console.error('No token found');
        return null;
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
            method,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : undefined, // Only include body if it's provided
        });

        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }

        return await response.json(); // Assuming the response is JSON
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
};
