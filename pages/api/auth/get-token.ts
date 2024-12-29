import type { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Access the token from the cookies (server-side only)
  const cookies = parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  res.status(200).json({ token });
}
