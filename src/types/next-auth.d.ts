/**
 * @ @author: Razvan Rauta
 * @ Date: Nov 30 2021
 * @ Time: 13:07
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Session } from 'next-auth';

import type { FireBaseUser } from '.';

declare module 'next-auth' {
  interface Session {
    user: FireBaseUser;
  }
}
