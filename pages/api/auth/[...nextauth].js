import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { baseUrl } from '../../../axios/api';

export const authOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        callbackUrl: '/dashboard',
      },
      async authorize(credentials) {
        const authResponse = await fetch(`${baseUrl}/api/v1/auth/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });
        const authData = await authResponse.json();
        if (!authResponse.ok || !authData) {
          return null;
        }

        return {
          accessToken: authData.accessToken,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const userResponse = await fetch(`${baseUrl}/api/v1/user/myBio`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token.user.accessToken,
        },
      });
      const user = await userResponse.json();

      session.user = {
        accessToken: token.user.accessToken,
        ...user,
      };

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
