import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { protectedProcedure, createTRPCRouter } from '../trpc';
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
  signedUrl: protectedProcedure.mutation(async ({ ctx }) => {
    const { id } = ctx.session?.user;
    const command = new PutObjectCommand({
      Bucket: env.UPLOAD_AWS_S3_BUCKET_NAME,
      Key: id
    });

    return {
      url: await getSignedUrl(client, command, { expiresIn: 120 })
    };
  }),
  upload: protectedProcedure.mutation(async ({ ctx }) => {
    const { id } = ctx.session?.user;

    await db.userProfile.update({ where: { userId: id }, data: { pic: id } });
    return {
      message: 'Success'
    };
  }),
  delete: protectedProcedure.mutation(async ({ ctx }) => {
    const { id } = ctx.session?.user;
    const cmd = new DeleteObjectCommand({
      Bucket: env.UPLOAD_AWS_S3_BUCKET_NAME,
      Key: id
    });
    await client.send(cmd);
    await db.userProfile.update({ where: { userId: id }, data: { pic: '' } });
    return {
      message: 'Successfully deleted'
    };
  })
});
