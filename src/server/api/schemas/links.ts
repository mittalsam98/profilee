import * as z from 'zod';
export const UpdateLinkSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  bio: z.string().optional()
});
