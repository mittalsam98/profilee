import { TRPCError } from '@trpc/server';
import { Context } from '@/server/api/trpc';
import { db } from '@/server/db';

export const getUser = async ({
  ctx,
  includeUserProfile = false,
  includeSocialLink = false,
  includeAdhocLink = false
}: {
  ctx: Context;
  includeUserProfile?: boolean;
  includeSocialLink?: boolean;
  includeAdhocLink?: boolean;
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
      userProfile: includeUserProfile,
      socialLink: includeSocialLink,
      adhocLink: includeAdhocLink
    }
  });

  if (!user) throw new TRPCError({ message: 'User not found', code: 'NOT_FOUND' });

  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email: email
    },
    select: {
      id: true,
      name: true,
      email: true,
      username: true
    }
  });

  return user;
};
export const getUserByUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username: username
    },
    select: {
      id: true,
      name: true,
      email: true,
      username: true
    }
  });

  return user;
};
