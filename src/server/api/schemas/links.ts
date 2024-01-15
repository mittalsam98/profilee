import * as z from 'zod';
export const UpdateLinkSchema = z.object({
  title: z.string(),
  bio: z.string().optional()
});
