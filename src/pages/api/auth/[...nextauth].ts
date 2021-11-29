import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

import { ICustomSession } from '@/types';

interface ISessionParams {
  session: ICustomSession;
  token: JWT;
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, token }: ISessionParams) {
      if (session && session.user) {
        session.user.tag = (session.user.name || '')
          .split(' ')
          .join('')
          .toLocaleLowerCase();
        session.user.uid = token.sub || '';
      }

      return session;
    },
  },
});
