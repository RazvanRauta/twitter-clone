import { PrismaClient } from '@prisma/client';
import type { NextApiResponse } from 'next';

import { sendResponse } from '@/lib/middlewares/handle-response';
import { withSession } from '@/lib/middlewares/with-session';

import type { NextApiRequestWithUser, TweetsWithUser } from '@/types';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  const prisma = new PrismaClient();

  if (req.method === 'GET') {
    const [tweets, totalTweets] = await prisma.$transaction([
      prisma.tweet.findMany({
        include: { user: true },
        orderBy: {
          timestamp: 'desc',
        },
      }),
      prisma.tweet.count(),
    ]);
    if (totalTweets > 0) {
      sendResponse<TweetsWithUser>({
        data: tweets,
        status: 200,
        count: totalTweets,
        res,
      });
    } else {
      sendResponse({
        error: 'No tweets were found',
        status: 404,
        res,
      });
    }
  } else {
    sendResponse({
      error: 'Method Not Allowed',
      status: 405,
      res,
    });
  }
}

export default withSession(handler);
