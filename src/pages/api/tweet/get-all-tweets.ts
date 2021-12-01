import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function getAllTweets(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const prisma = new PrismaClient();

  if (session) {
    if (req.method === 'GET') {
      const tweets = await prisma.tweet.findMany();
      if (tweets.length) {
        res.status(200).json(tweets);
        res.end();
      } else {
        res.status(404);
        res.end();
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
      res.end();
    }
  } else {
    res.status(401);
    res.end();
  }
}
