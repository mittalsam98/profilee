import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { getServerSession, type DefaultSession, type NextAuthOptions } from 'next-auth';
import bcrypt from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import { env } from '@/env.mjs';
import { db } from '@/server/db';
import { TRPCError } from '@trpc/server';
import { LoginSchema } from './api/schemas';
import { getUserByEmail, getUserById } from './api/utils/user';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
    } & DefaultSession['user'];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/login',
    newUser: '/claim/username'
  },
  // events: {
  // updateUser(props) {
  //   console.log('----------', { props });
  // },
  // session(props) {
  //   console.log('----22222--------------', { props });
  // }
  //   linkAccount(props) {
  //     console.log('1111', { props });
  //   }
  // },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.username = existingUser.username;

      return token;
    },
    session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.username = token.username as string;
      }
      // console.log('🚀 ~ session ~ session:', { session, token });

      return session;
    }
  },
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password)
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Invalid Credentials.'
          });

        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user?.password) {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: 'User not found with this email.'
            });
          }

          const isValidPassword = await bcrypt.compare(password, user.password);
          if (!isValidPassword)
            throw new TRPCError({
              code: 'UNAUTHORIZED',
              message: 'Invalid Password.'
            });

          if (isValidPassword) return user;
        }

        return null;
      }
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    })
  ],
  session: { strategy: 'jwt' }
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
