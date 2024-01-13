import { Context, createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc';
import { UpdateLinkSchema } from '../schemas/links';
import { z } from 'zod';
import { db } from '@/server/db';

const getUser = async (ctx: Context) => {
  const { session } = ctx;

  const user = await db.user.findUnique({
    where: {
      id: session?.user.id
    },
    select: {
      id: true,
      email: true,
      name: true
    }
  });

  if (!user) throw new Error('User not found');

  return user;
};

export const linkRouter = createTRPCRouter({
  updateProfile: protectedProcedure.input(UpdateLinkSchema).mutation(async ({ input, ctx }) => {
    const { session } = ctx;
    const user = await getUser(ctx);
    await db.userProfile.create({
      data: {
        title: input.title,
        bio: input.bio,
        userId: user.id
      }
    });
    return user;
  })
});
