import type { Session } from 'next-auth';
import NextAuth from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

interface ISessionParams {
  session: Session;
  token: JWT;
}

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
