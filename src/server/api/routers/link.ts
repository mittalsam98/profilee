import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc';
import { UpdateLinkSchema } from '../schemas/links';
import { z } from 'zod';

export const linkRouter = createTRPCRouter({
  updateProfile: protectedProcedure.input(UpdateLinkSchema).mutation(async ({ input }) => {
    console.log(input, 'sas');
    return;
  }),
  getCookie: publicProcedure.input(z.string()).query(async ({ input }) => {
    console.log(input, 'sdas');

    return '🍪';
  })
});
