import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { z } from 'zod';

import { protectedProcedure, publicProcedure, createTRPCRouter } from '../trpc';
import { env } from '@/env.mjs';
import { db } from '@/server/db';

const client = new S3Client({
  region: env.UPLOAD_AWS_REGION,
  credentials: {
    accessKeyId: env.UPLOAD_AWS_ACCESS_KEY_ID,
    secretAccessKey: env.UPLOAD_AWS_SECRET_ACCESS_KEY
  }
});

export const imagesRouter = createTRPCRouter({
  upload: protectedProcedure
    // .input(
    //   z.object({
    //     width: z.number(),
    //     height: z.number()
    //   })
    // )
    .mutation(async ({ ctx, input }) => {
      const { id } = ctx.session?.user;
      //   const { width, height } = input;
      const command = new PutObjectCommand({
        Bucket: env.UPLOAD_AWS_S3_BUCKET_NAME,
        Key: id
      });

      await db.userProfile.update({ where: { userId: id }, data: { pic: id } });
      return {
        url: await getSignedUrl(client, command, { expiresIn: 120 })
      };
    }),
  delete: protectedProcedure.mutation(async ({ ctx }) => {
    const { id } = ctx.session?.user;
    const command = new DeleteObjectCommand({
      Bucket: env.UPLOAD_AWS_S3_BUCKET_NAME,
      Key: id
    });
    await db.userProfile.update({ where: { userId: id }, data: { pic: null } });
    return {
      message: 'Successfully deleted'
    };
  })
  //   get: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
  //     const image = await ctx.prisma.image.findUnique({
  //       where: { slug: input },
  //       include: { user: true }
  //     });
  //     if (!image) {
  //       throw new Error('Image not found');
  //     }
  //     return image;
  //   })
});
