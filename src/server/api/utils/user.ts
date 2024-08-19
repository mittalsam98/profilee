import { TRPCError } from '@trpc/server';
import { Context } from '@/server/api/trpc';
import { db } from '@/server/db';

export const getUser = async ({
  ctx,
  includeUserProfile = false,
  includeSocialLink = false,
  includeAdhocLink = false,
  includeGeneralAppearance = false
}: {
  ctx: Context;
  includeUserProfile?: boolean;
  includeSocialLink?: boolean;
  includeAdhocLink?: boolean;
  includeGeneralAppearance?: boolean;
}) => {
  const { session } = ctx;

  const user = await db.user.findUnique({
    where: {
      id: session?.user.id
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      username: true,
      userProfile: includeUserProfile,
      socialLink: includeSocialLink,
      adhocLink: includeAdhocLink,
      generalAppearance: includeGeneralAppearance
    }
  });

  if (!user) throw new TRPCError({ message: 'User not found', code: 'NOT_FOUND' });

  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email: email
    }
  });

  return user;
};

export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id: id
    }
  });

  return user;
};
export const getUserByUsername = async (
  username: string,
  includeUserProfile = false,
  includeSocialLink = false,
  includeAdhocLink = false,
  includeGeneralAppearance = false
) => {
  const user = await db.user.findUnique({
    where: {
      username: username
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      username: true,
      userProfile: includeUserProfile,
      socialLink: includeSocialLink,
      adhocLink: includeAdhocLink,
      generalAppearance: includeGeneralAppearance
    }
  });

  return user;
};
