import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { db } from '@/server/db';
import { GeneralAppearanceSchema } from '../schemas';
import { getUser } from '../utils/user';

export const generalAppearanceRouter = createTRPCRouter({
  updateGeneralAppearance: protectedProcedure
    .input(GeneralAppearanceSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await getUser({ ctx: ctx, includeUserProfile: true });
      const updatedUserProfile = await db.generalAppearance.upsert({
        where: {
          userId: user.id
        },
        update: {
          hideBranding: input.hideBranding,
          enableShareButton: input.enableShareButton,
          primaryBackgroundColor: input.primaryBackgroundColor,
          primaryBackgroundImage: input.primaryBackgroundImage,
          fontFamily: input.fontFamily,
          linkCardShadow: input.linkCardShadow,
          useSecondaryBackground: input.useSecondaryBackground,
          secondaryBackgroundColor: input.secondaryBackgroundColor,
          secondaryBackgroundImage: input.secondaryBackgroundImage
        },
        create: {
          hideBranding: input.hideBranding,
          enableShareButton: input.enableShareButton,
          primaryBackgroundColor: input.primaryBackgroundColor,
          primaryBackgroundImage: input.primaryBackgroundImage,
          fontFamily: input.fontFamily,
          linkCardShadow: input.linkCardShadow,
          useSecondaryBackground: input.useSecondaryBackground,
          secondaryBackgroundColor: input.secondaryBackgroundColor,
          secondaryBackgroundImage: input.secondaryBackgroundImage,
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
