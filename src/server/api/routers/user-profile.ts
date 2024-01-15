import { Context, createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc';
import { UpdateLinkSchema } from '../schemas/links';
import { db } from '@/server/db';
import { getUser } from '../utils/user';

export const userProfileRouter = createTRPCRouter({
  updateUserProfile: protectedProcedure.input(UpdateLinkSchema).mutation(async ({ input, ctx }) => {
    const user = await getUser({ ctx: ctx, includeUserProfile: true });
    const updatedUserProfile = await db.userProfile.upsert({
      where: {
        userId: user.id
      },
      update: {
        title: input.title,
        bio: input.bio
      },
      create: {
        title: input.title,
        bio: input.bio,
        userId: user.id
      }
    });
    console.log(updatedUserProfile);
    return updatedUserProfile;
  }),
  getUserProfile: protectedProcedure.query(async ({ ctx }) => {
    const user = await getUser({ ctx: ctx });
    console.log('🚀 ~ getUserProfile:protectedProcedure.query ~ user:', user);
    return user;
  })
});
