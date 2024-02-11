import { Context, createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc';
import { db } from '@/server/db';
import { getUser } from '../utils/user';
import { AdhocLinkSchema } from '../schemas';
import { Prisma } from '@prisma/client';
import { AdhocLinks } from '@/types/types';

export const adHocLinkRouter = createTRPCRouter({
  updateAdhocLinks: protectedProcedure.input(AdhocLinkSchema).mutation(async ({ input, ctx }) => {
    const user = await getUser({ ctx: ctx, includeSocialLink: true });

    const updatedAdhocLink = await db.adhocLink.upsert({
      where: {
        userId: user.id
      },
      update: {
        data: input as AdhocLinks[]
      },
      create: {
        data: input as AdhocLinks[],
        userId: user.id
      }
    });
    return updatedAdhocLink;
  }),
  getSocialLinks: protectedProcedure.query(async ({ ctx }) => {
    const user = await getUser({ ctx: ctx, includeSocialLink: true });
    return user;
  })
});
