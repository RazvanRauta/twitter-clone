/**
 * @ @author: Razvan Rauta
 * @ Date: Nov 30 2021
 * @ Time: 10:42
 */

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import * as Prisma from '@prisma/client';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const prisma = new Prisma.PrismaClient();

export default NextAuth({
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session }) {
      if (session?.user?.name) {
        session.user.tag = session.user.name
          .split(' ')
          .join('')
          .toLocaleLowerCase();
      }

      return session;
    },
  },
});
