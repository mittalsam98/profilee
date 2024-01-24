import * as z from 'zod';
export const UpdateProfileSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string'
    })
    .min(1),
  bio: z.string().optional()
});
export const SocialLinkSchema = z.record(z.string(), z.string());
