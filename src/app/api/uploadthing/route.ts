import { appFileRouter } from '@/server/uploadthing';
import { createNextRouteHandler } from 'uploadthing/next';

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: appFileRouter
});
