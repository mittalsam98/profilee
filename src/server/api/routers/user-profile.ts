import { Context, createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc';
import { UpdateProfileSchema } from '../schemas';
import { db } from '@/server/db';
import { getUser } from '../utils/user';

export const userProfileRouter = createTRPCRouter({
  updateUserProfile: protectedProcedure
    .input(UpdateProfileSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await getUser({ ctx: ctx, includeUserProfile: true });
      const updatedUserProfile = await db.userProfile.upsert({
        where: {
          userId: user.id
        },
        update: {
          title: input.title,
          bio: input.bio,
          bioColor: input.bioColor,
          titleColor: input.titleColor,
          titleFontSize: input.titleFontSize,
          bioFontSize: input.bioFontSize,
          profilePicBorder: input.profilePicBorder
        },
        create: {
          title: input.title,
          bio: input.bio,
          bioColor: input.bioColor,
          pic: user.id,
          titleColor: input.titleColor,
          titleFontSize: input.titleFontSize,
          bioFontSize: input.bioFontSize,
          profilePicBorder: input.profilePicBorder,
          userId: user.id
        }
      });
      return updatedUserProfile;
    }),
  getUserProfile: protectedProcedure.query(async ({ ctx }) => {
    const user = await getUser({ ctx: ctx, includeUserProfile: true });
    return user;
  }),
  getUserCompleteProfile: protectedProcedure.query(async ({ ctx }) => {
    const user = await getUser({
      ctx: ctx,
      includeUserProfile: true,
      includeAdhocLink: true,
      includeSocialLink: true,
      includeGeneralAppearance: true
    });
    return user;
  })
});
