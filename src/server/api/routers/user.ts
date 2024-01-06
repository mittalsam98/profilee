import { z } from 'zod';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc';

export const userRouter = createTRPCRouter({
  createUser: protectedProcedure.input(z.object({})).mutation(({ ctx }) => {})
});
