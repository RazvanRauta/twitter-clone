/**
 * @ @author: Razvan Rauta
 * @ Date: Nov 30 2021
 * @ Time: 10:42
 */

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import * as Prisma from '@prisma/client';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const prisma = new Prisma.PrismaClient();

export default NextAuth({
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          tag: profile.name.split(' ').join('').toLocaleLowerCase(),
        };
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      scope: 'read:user',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile['avatar_url'],
          tag: profile.login.toLocaleLowerCase(),
        };
      },
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
