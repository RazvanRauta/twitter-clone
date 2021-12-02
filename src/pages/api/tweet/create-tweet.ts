import type { Tweet } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import type { NextApiResponse } from 'next';

import { sendResponse } from '@/lib/middlewares/handle-response';
import { withSession } from '@/lib/middlewares/with-session';

import type { NextApiRequestWithUser } from '@/types';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  const prisma = new PrismaClient();
  const user = req.user;
  if (!user) {
    sendResponse({
      error: 'Ups! You need to login first!',
      status: 401,
      res,
    });
  } else {
    if (req.method === 'POST') {
      const newTweet = await prisma.tweet.create({
        data: {
          text: req.body.text,
          image: req.body.image,
          timestamp: req.body.timestamp,
          userId: user.id,
        },
      });
      sendResponse<Tweet>({
        status: 201,
        data: newTweet,
        res,
      });
    } else {
      sendResponse({
        status: 405,
        error: 'Method Not Allowed',
        res,
      });
    }
  }
}

export default withSession(handler);
