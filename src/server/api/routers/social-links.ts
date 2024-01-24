import { Context, createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc';
import { db } from '@/server/db';
import { getUser } from '../utils/user';
import { SocialLinkSchema } from '../schemas/schemas';

export const socialLinkRouter = createTRPCRouter({
  updateSocialLinks: protectedProcedure.input(SocialLinkSchema).mutation(async ({ input, ctx }) => {
    console.log('🚀 ~ updateUserProfile:protectedProcedure.input ~ input:', input);
    const user = await getUser({ ctx: ctx, includeUserProfile: true });
    const updatedUserProfile = await db.socialLink.upsert({
      where: {
        userId: user.id
      },
      data: {}
    });
    return updatedUserProfile;
    // const updatedUserProfile = await db.userProfile.upsert({});
    // return updatedUserProfile;
  }),
  getSocialLinks: protectedProcedure.query(async ({ ctx }) => {
    const user = await getUser({ ctx: ctx, includeUserProfile: true });
    console.log('🚀 ~ getSocialLinks:protectedProcedure.query ~ user:', user);
    return user;
  })
});
