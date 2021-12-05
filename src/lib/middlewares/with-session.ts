/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 02 2021
 * @ Time: 11:45
 */

import type { NextApiResponse } from 'next/types';
import { getSession } from 'next-auth/react';

import { sendResponse } from './handle-response';

import type { ApiHandler, NextApiRequestWithUser } from '@/types';

/**
 * Verify if the user is logged in
 */
export const withSession =
  (handler: ApiHandler) =>
  async (req: NextApiRequestWithUser<unknown>, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (session) {
      req.user = session.user;
      return handler(req, res);
    } else {
      sendResponse({
        error: 'Ups! You need to login first!',
        status: 401,
        res,
      });
    }
  };
