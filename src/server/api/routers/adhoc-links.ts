import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc';
import { db } from '@/server/db';
import { AdhocLinks } from '@/types/types';
import { EventType } from '@prisma/client';
import { AdhocLinkSchema, LinkAnalytics, LinkInteraction } from '../schemas';
import { getUser } from '../utils/user';

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
  }),
  adhocLinkInteraction: publicProcedure.input(LinkInteraction).mutation(async ({ input }) => {
    const { adhocLinkId, userId } = input;

    const linkAnalytics = await db.linkAnalytics.findFirst({
      where: {
        userId: userId,
        adhocLinkId: adhocLinkId
      }
    });

    if (!linkAnalytics) {
      await db.linkAnalytics.create({
        data: {
          userId,
          eventType: EventType.CLICK,
          adhocLinkId
        }
      });
    } else {
      await db.linkAnalytics.update({
        where: {
          userId_adhocLinkId: {
            userId: userId,
            adhocLinkId: adhocLinkId
          }
        },
        data: {
          userId,
          eventType: EventType.CLICK,
          adhocLinkId,
          count: {
            increment: 1
          }
        }
      });
    }

    return { message: 'success' };
  }),
  getLinkAnalytics: protectedProcedure.input(LinkAnalytics).query(async ({ input, ctx }) => {
    const { session } = ctx;
    const { adhocLinkId } = input;

    const linkAnalytics = await db.linkAnalytics.findFirst({
      where: {
        userId: session?.user.id,
        adhocLinkId: adhocLinkId
      }
    });

    return linkAnalytics;
  })
});
