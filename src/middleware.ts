import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  const { nextUrl } = req;

  if (nextUrl.pathname.includes('/builder') && isAuthenticated && token) {
    if (!token?.username) {
      return NextResponse.redirect(new URL('/claim/username', req.url));
    }
  }

  if (nextUrl.pathname === '/claim/username' && token?.username && isAuthenticated) {
    return NextResponse.redirect(new URL('/builder', req.url));
  }

  const authMiddleware = await withAuth({
    pages: {
      signIn: '/auth/login',
      newUser: '/auth/new-user'
    }
  });

  // @ts-expect-error
  return authMiddleware(req, event);
}
export const config = {
  matcher: ['/builder', '/claim/username']
};
