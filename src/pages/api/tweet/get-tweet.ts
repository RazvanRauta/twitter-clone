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

import type {
  NextApiRequestWithUser,
  TweetWithCommentsAndCount,
} from '@/types';

async function handler(
  req: NextApiRequestWithUser<null>,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const tweet = await prisma.tweet.findFirst({
        include: {
          user: true,
          comments: {
            include: {
              user: true,
              commentLikes: {
                include: {
                  user: {
                    select: {
                      email: true,
                    },
                  },
                },
              },
              _count: {
                select: {
                  commentLikes: true,
                },
              },
            },
            orderBy: {
              timestamp: 'desc',
            },
          },
          likes: {
            select: {
              user: {
                select: {
                  email: true,
                },
              },
              id: true,
            },
          },
          _count: {
            select: {
              comments: true,
              likes: true,
            },
          },
        },
        where: {
          id: id as string,
        },
      });
      if (tweet) {
        sendResponse<TweetWithCommentsAndCount>({
          data: tweet,
          status: 200,
          count: 1,
          res,
        });
      } else {
        sendResponse({
          error: `No tweet was found with id: ${id}`,
          status: 404,
          res,
        });
      } // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      logger.error(
        `\n\n⚠️⚠️⚠️⚠️----Error while fetching tweet with id: ${id}----⚠️⚠️⚠️⚠️⚠️\n\n`,
        error
      );
      sendResponse({
        error: error.message || `Error while fetching tweet with id: ${id}`,
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
