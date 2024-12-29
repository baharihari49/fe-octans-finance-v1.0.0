// pages/api/auth/set-token.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

// Define the expected body type
interface SetTokenBody {
  token: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body as SetTokenBody; // Explicitly type the body
  const { token } = body;

  if (!token) {
    res.status(400).json({ message: 'Token is required' });
    return;
  }

  res.setHeader(
    'Set-Cookie',
    serialize('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    })
  );

  res.status(200).json({ message: 'Token set' });
}
