import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const middleware = async (request: NextRequest) => {
  const privatePages = [
    "/course-creation",
    "/dashboard",
    "/course",
    "/course-completion",

    // Api routes
    "/api/course/",
    "/api/course/byId",
    "/api/course/bySlug",
    "/api/course/updateRatings",

    "/api/activity",

    "/api/courseTopic",

    "/api/enrollState",
  ];

  const token = await getToken({ req: request });

  const pathName = request.nextUrl.pathname;

  let isPrivatePage = privatePages.includes(pathName);

  privatePages.map((pv) => {
    if (pathName.startsWith(pv)) {
      isPrivatePage = true;
      return;
    }
  });

  if (isPrivatePage && !token) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${pathName}`, request.nextUrl)
    );
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
