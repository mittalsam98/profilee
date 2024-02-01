import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc';
import { RegisterSchema } from '../schemas';
import { getUserByEmail, getUserByUsername } from '../utils/user';
import { db } from '@/server/db';

export const userRouter = createTRPCRouter({
  createUser: publicProcedure.input(RegisterSchema).mutation(async ({ input, ctx }) => {
    const { email, password, username } = input;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingEmail = await getUserByEmail(email);

    if (existingEmail) {
      throw new TRPCError({ message: 'Email already in use!', code: 'BAD_REQUEST' });
    }

    const existingUsername = await getUserByUsername(username);
    if (existingUsername) {
      throw new TRPCError({
        message: 'Username already in use. Please use other name!',
        code: 'BAD_REQUEST'
      });
    }

    await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        name: username
      }
    });

    return { success: 'User created successfully ' };
  })
});
