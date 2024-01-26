import { Context, createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc';
import { db } from '@/server/db';
import { getUser } from '../utils/user';
import { AdhocLinkSchema } from '../schemas/schemas';

export const adHocLinkRouter = createTRPCRouter({
  updateAdhocLinks: protectedProcedure.input(AdhocLinkSchema).mutation(async ({ input, ctx }) => {
    console.log('🚀 ~ updateAdhocLinks:protectedProcedure.input ~ input:', input);
    const user = await getUser({ ctx: ctx, includeSocialLink: true });

    // const updatedAdhocLinks = input.map((val) => {
    //   return {
    //     ...val,
    //     userId: user.id
    //   };
    // });
    const updatedAdhocLinks = await Promise.all(
      input.map((val) => {
        return db.adhocLink.create({
          data: {
            user: {
              connect: {
                id: user.id
              }
            },
            ...val
          }
        });
      })
    );

    console.log(updatedAdhocLinks);
    return updatedAdhocLinks;

    // const updatedUserProfile = await db.adhocLink.create({
    //   data: {
    //     user: {
    //       connect: {
    //         id: user.id
    //       }
    //     }
    //   }
    // });

    // const updatedUserProfile = await db.adhocLink.upsert({
    //   where: {
    //     userId: user.id
    //   },
    //   update: input,
    //   create: input
    // });

    // const updatedUserProfile = await db.adhocLink.createMany({
    //   data: updatedAdhocLinks
    // });
  }),
  getSocialLinks: protectedProcedure.query(async ({ ctx }) => {
    const user = await getUser({ ctx: ctx, includeSocialLink: true });
    console.log('🚀 ~ getSocialLinks:protectedProcedure.query ~ user:', user);
    return user;
  })
});
