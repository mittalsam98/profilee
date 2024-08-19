import { EventType } from '@prisma/client';
import * as z from 'zod';
export const UpdateProfileSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string'
    })
    .min(1),
  bio: z.string(),
  bioColor: z.string(),
  titleColor: z.string(),
  titleFontSize: z.string(),
  bioFontSize: z.string(),
  profilePicBorder: z.string()
});
export const AdhocLinkSchema = z
  .object({
    name: z.string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string'
    }),
    link: z.string(),
    id: z.string(),
    isActive: z.boolean(),
    theme: z.object({
      textAlign: z.string(),
      backgroundColor: z.string(),
      textColor: z.string(),
      borderColor: z.string(),
      borderRadius: z.string()
    })
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
export const UsernameSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: 'Username is required'
    })
    .refine((s) => !s.includes(' '), 'No spaces are allowed')
});

export const LinkInteraction = z.object({
  adhocLinkId: z.string(),
  userId: z.string(),
  eventType: z.enum([EventType.CLICK])
});
export const LinkAnalytics = z.object({
  adhocLinkId: z.string()
});

export const GeneralAppearanceSchema = z.object({
  hideBranding: z.boolean(),
  enableShareButton: z.boolean(),
  primaryBackgroundColor: z.string(),
  primaryBackgroundImage: z.string(),
  fontFamily: z.string(),
  linkCardShadow: z.string(),
  useSecondaryBackground: z.boolean(),
  secondaryBackgroundImage: z.string(),
  secondaryBackgroundColor: z.string()
});
