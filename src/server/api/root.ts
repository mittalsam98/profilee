import { userRouter } from '@/server/api/routers/user';
import { userProfileRouter } from '@/server/api/routers/user-profile';
import { socialLinkRouter } from '@/server/api/routers/social-links';
import { adHocLinkRouter } from '@/server/api/routers/adhoc-links';
import { createTRPCRouter } from '@/server/api/trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  userProfile: userProfileRouter,
  socialLink: socialLinkRouter,
  adHocLink: adHocLinkRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
