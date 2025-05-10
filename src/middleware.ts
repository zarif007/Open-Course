import { getToken } from 'next-auth/jwt';
import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export { default } from 'next-auth/middleware';

export const middleware = async (request: NextRequest) => {
  const protectedPages = [
    '/course-creation',
    '/course-update',
    '/dashboard',
    '/course',
    '/course-completion',
    '/ai/course-creation',
  ];

  const token = await getToken({ req: request });

  const pathName = request.nextUrl.pathname;

  const canAccess = (protectedRoutes: string[]) => {
    let isPrivate = protectedRoutes.includes(pathName);

    protectedRoutes.map((pv) => {
      if (pathName.startsWith(pv)) {
        isPrivate = true;
        return;
      }
    });

    return !(isPrivate && !token);
  };

  if (pathName.startsWith('/api')) {
  } else {
    if (!canAccess(protectedPages)) {
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${pathName}`, request.nextUrl)
      );
    }
  }
};

export const config = {
  matcher: [
    '/course/:path*',
    '/course-update/:path*',
    '/course-completion/:path*',
    '/course-creation',
    '/dashboard',
    '/api/:path*',
    '/ai/course-creation',
  ],
};
