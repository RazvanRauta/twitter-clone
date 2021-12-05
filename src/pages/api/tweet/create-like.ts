/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 04 2021
 * @ Time: 11:09
 */

import type { Comment, Like } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import type { NextApiResponse } from 'next';

import logger from '@/lib/logger';
import { sendResponse } from '@/lib/middlewares/handle-response';
import { withSession } from '@/lib/middlewares/with-session';

import type { NextApiRequestWithUser, TweetWithUser } from '@/types';

async function handler(
  req: NextApiRequestWithUser<Comment>,
  res: NextApiResponse
) {
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
      try {
        const newLike = await prisma.like.create({
          data: {
            tweet: {
              connect: {
                id: req.body.tweetId,
              },
            },
            user: {
              connect: {
                email: user.email,
              },
            },
          },
        });
        sendResponse<Like>({
          status: 201,
          data: newLike,
          res,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        logger.error(
          '\n\n⚠️⚠️⚠️⚠️----Error while creating a new like----⚠️⚠️⚠️⚠️⚠️\n\n',
          error
        );

        sendResponse<TweetWithUser>({
          status: 400,
          error: error.message || 'Error while creating a new like',
          res,
        });
      }
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
