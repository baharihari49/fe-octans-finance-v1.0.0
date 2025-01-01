import type { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Access the token from the cookies (server-side only)
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Ensure `req.query.url` is a valid string
    const url = Array.isArray(req.query.url) ? req.query.url[0] : req.query.url;
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    // Make the API request
    const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
      method: req.method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    const responseData = (await apiResponse.json()) as Record<string, unknown>; // Explicitly type the response
    res.status(apiResponse.status).json(responseData);
  } catch (error) {
    console.error('Error in API proxy:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
