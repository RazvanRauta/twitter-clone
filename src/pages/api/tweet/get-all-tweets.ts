import { PrismaClient } from '@prisma/client';
import type { NextApiResponse } from 'next';

import { withSession } from '@/lib/middlewares/with-session';

import type { NextApiRequestWithUser } from '@/types';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  const prisma = new PrismaClient();

  if (req.method === 'GET') {
    const tweets = await prisma.tweet.findMany();
    if (tweets.length) {
      res.status(200).json(tweets);
      res.end();
    } else {
      res.status(404).json;
      res.end();
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
    res.end();
  }
}

export default withSession(handler);
