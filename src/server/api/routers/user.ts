import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc';
import { RegisterSchema, UsernameSchema } from '../schemas';
import { getUser, getUserByEmail, getUserById, getUserByUsername } from '../utils/user';
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

    return { success: true, message: 'User created successfully ' };
  }),
  createUsername: protectedProcedure.input(UsernameSchema).mutation(async ({ input, ctx }) => {
    const { username } = input;
    const { session } = ctx;

    const existingUsername = await getUserByUsername(username);

    if (existingUsername?.id === session.user.id) {
      throw new TRPCError({
        message: "Current username and new username can't be same",
        code: 'BAD_REQUEST'
      });
    }
    if (existingUsername) {
      throw new TRPCError({
        message: 'Username already in use. Please use other name!',
        code: 'BAD_REQUEST'
      });
    }

    const user = await getUserById(session.user.id);
    if (!user) throw new TRPCError({ message: 'User not found', code: 'NOT_FOUND' });

    await db.user.update({ where: { id: user.id }, data: { username: username } });

    return { success: true, message: 'Username added successfully' };
  })
});
