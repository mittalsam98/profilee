import { userRouter } from '@/server/api/routers/user';
import { linkRouter } from '@/server/api/routers/link';
import { createTRPCRouter } from '@/server/api/trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  link: linkRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
