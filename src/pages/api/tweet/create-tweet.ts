import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function createTweet(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const prisma = new PrismaClient();

  if (session) {
    if (req.method === 'POST') {
      const newTweet = await prisma.tweet.create({
        data: {
          text: req.body.text,
          image: req.body.image,
          timestamp: req.body.timestamp,
          userId: session.user.id,
        },
      });
      res.status(201).json(newTweet);
      res.end();
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
      res.end();
    }
  } else {
    res.status(401);
    res.end();
  }
}
