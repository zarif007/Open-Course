import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const middleware = async (request: NextRequest) => {
  const protectedPages = [
    "/course-creation",
    "/dashboard",
    "/course",
    "/course-completion",
  ];

  const protectedApiRoutes = [
    "/api/course/byId",
    "/api/course/bySlug",
    "/api/course/updateRatings",

    "/api/activity",

    "/api/courseTopic",

    "/api/enrollState",
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

  if (pathName.startsWith("/api")) {
    if (!canAccess(protectedApiRoutes)) {
      return NextResponse.json({
        status: 401,
        message: "Unauthorized: Login required",
      });
    }
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
    "/course/:path*",
    "/course-completion/:path*",
    "/course-creation",
    "/dashboard",
    "/api/:path*",
  ],
};
