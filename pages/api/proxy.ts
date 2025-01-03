/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';

interface ApiResponseData<T = any> {
  status: number;
  message?: string;
  data?: T; // Gantilah sesuai kebutuhan
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Access `url` and `parameter` from query
    const url = Array.isArray(req.query.url) ? req.query.url[0] : req.query.url;
    const parameter = Array.isArray(req.query.parameter) ? req.query.parameter[0] : req.query.parameter;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    // Build the API URL dynamically
    const apiUrl = parameter
      ? `${process.env.NEXT_PUBLIC_API_URL}/${url}/${parameter}`
      : `${process.env.NEXT_PUBLIC_API_URL}/${url}`;

    // Make the API request
    const apiResponse = await fetch(apiUrl, {
      method: req.method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    const responseData: ApiResponseData = await apiResponse.json();
    res.status(apiResponse.status).json(responseData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
