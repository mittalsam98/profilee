import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { db } from '@/server/db';
import { getUser } from '../utils/user';
import { SocialLinkSchema } from '../schemas';

export const socialLinkRouter = createTRPCRouter({
  updateSocialLinks: protectedProcedure.input(SocialLinkSchema).mutation(async ({ input, ctx }) => {
    console.log('🚀 ~ updateUserProfile:protectedProcedure.input ~ input:', input);
    const user = await getUser({ ctx: ctx, includeSocialLink: true });
    const updatedUserProfile = await db.socialLink.upsert({
      where: {
        userId: user.id
      },
      update: {
        data: input
      },
      create: {
        data: input,
        userId: user.id
      }
    });
    return updatedUserProfile;
  }),
  getSocialLinks: protectedProcedure.query(async ({ ctx }) => {
    const user = await getUser({ ctx: ctx, includeSocialLink: true });
    console.log('🚀 ~ getSocialLinks:protectedProcedure.query ~ user:', user);
    return user;
  })
});
