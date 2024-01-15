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
    include: {
      userProfile: includeUserProfile,
      socialLink: includeSocialLink,
      adhocLink: includeAdhocLink
    }
  });

  if (!user) throw new Error('User not found');

  return user;
};
