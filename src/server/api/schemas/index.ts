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
export const AdhocLinkSchema = z
  .object({
    name: z.string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string'
    }),
    link: z.string(),
    id: z.string(),
    isActive: z.boolean()
  })
  .array();

export const SocialLinkSchema = z.record(z.string(), z.string());

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required'
    })
    .email({
      message: 'Email is invalid'
    }),
  password: z.string().min(1, {
    message: 'Password is required'
  })
});

export const RegisterSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required'
    })
    .email({
      message: 'Email is invalid'
    }),
  password: z.string().min(6, {
    message: 'Minimum 6 characters required'
  }),
  username: z.string().min(1, {
    message: 'Username is required'
  })
});
