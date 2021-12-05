/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 04 2021
 * @ Time: 11:09
 */

import { PrismaClient } from '@prisma/client';
import type { NextApiResponse } from 'next';

import logger from '@/lib/logger';
import { sendResponse } from '@/lib/middlewares/handle-response';
import { withSession } from '@/lib/middlewares/with-session';

import type { NextApiRequestWithUser, TweetWithUser } from '@/types';

async function handler(
  req: NextApiRequestWithUser<{ id: string }>,
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
    if (req.method === 'DELETE') {
      try {
        await prisma.like.delete({
          where: {
            id: req.body.id,
          },
        });
        sendResponse<undefined>({
          status: 204,
          res,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        logger.error(
          '\n\n⚠️⚠️⚠️⚠️----Error while deleting a like----⚠️⚠️⚠️⚠️⚠️\n\n',
          error
        );

        sendResponse<TweetWithUser>({
          status: 400,
          error: error.message || 'Error while deleting a like',
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
