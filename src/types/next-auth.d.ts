/**
 * @ @author: Razvan Rauta
 * @ Date: Nov 30 2021
 * @ Time: 13:07
 */

import type Prisma from '@prisma/client';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Session } from 'next-auth';
declare module 'next-auth' {
  interface Session {
    user: Prisma.User;
  }
}
