/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 02 2021
 * @ Time: 20:00
 */

import { PrismaClient } from '@prisma/client';
import type { NextApiResponse } from 'next';

import logger from '@/lib/logger';
import { sendResponse } from '@/lib/middlewares/handle-response';
import { withSession } from '@/lib/middlewares/with-session';

import type { NextApiRequestWithUser, TweetWithUserAndCount } from '@/types';

async function handler(
  req: NextApiRequestWithUser<null>,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  if (req.method === 'GET') {
    try {
      const [tweets, totalTweets] = await prisma.$transaction([
        prisma.tweet.findMany({
          include: {
            user: true,
            _count: {
              select: {
                comments: true,
                likes: true,
              },
            },
          },
          orderBy: {
            timestamp: 'desc',
          },
        }),
        prisma.tweet.count(),
      ]);
      if (totalTweets > 0) {
        sendResponse<TweetWithUserAndCount[]>({
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
      } // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      logger.error(
        '\n\n⚠️⚠️⚠️⚠️----Error while fetching all the tweets----⚠️⚠️⚠️⚠️⚠️\n\n',
        error
      );
      sendResponse({
        error: error.message || 'Error while fetching all the tweets',
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
