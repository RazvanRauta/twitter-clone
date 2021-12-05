/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 04 2021
 * @ Time: 11:09
 */

import type { Comment, User } from '@prisma/client';
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
        const newComment = await prisma.comment.create({
          data: {
            comment: req.body.comment,
            timestamp: req.body.timestamp,
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
          include: {
            user: true,
          },
        });
        sendResponse<Comment & { user: User }>({
          status: 201,
          data: newComment,
          res,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        logger.error(
          '\n\n⚠️⚠️⚠️⚠️----Error while creating a new comment----⚠️⚠️⚠️⚠️⚠️\n\n',
          error
        );

        sendResponse<TweetWithUser>({
          status: 400,
          error: error.message || 'Error while creating a new comment',
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
