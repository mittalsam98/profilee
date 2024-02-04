import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { authRoutes, publicRoutes } from './lib/routes';
import { DEFAULT_LOGIN_REDIRECT } from './lib/constants';

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  const { nextUrl } = req;

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isAuthRoute) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
    }
  }

  if (nextUrl.pathname === '/claim/username' && token?.username && isAuthenticated) {
    return NextResponse.redirect(new URL('/builder', req.url));
  }

  //TODO- After claim page it is not auto redirecting
  if (nextUrl.pathname.includes('/builder') && !token?.username && isAuthenticated) {
    console.log(token?.username);
    return NextResponse.redirect(new URL('/claim/username', req.url));
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
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
};
