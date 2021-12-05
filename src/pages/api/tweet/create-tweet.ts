/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 04 2021
 * @ Time: 11:09
 */

import type { Tweet } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import type { NextApiResponse } from 'next';

import logger from '@/lib/logger';
import { sendResponse } from '@/lib/middlewares/handle-response';
import { withSession } from '@/lib/middlewares/with-session';

import type { NextApiRequestWithUser, TweetWithUser } from '@/types';

async function handler(
  req: NextApiRequestWithUser<Tweet>,
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
        const newTweet = await prisma.tweet.create({
          data: {
            text: req.body.text,
            image: req.body.image,
            timestamp: req.body.timestamp,
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
        sendResponse<TweetWithUser>({
          status: 201,
          data: newTweet,
          res,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        logger.error(
          '\n\n⚠️⚠️⚠️⚠️----Error while creating a new tweet----⚠️⚠️⚠️⚠️⚠️\n\n',
          error
        );

        sendResponse<TweetWithUser>({
          status: 400,
          error: error.message || 'Error while creating a new tweet',
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
