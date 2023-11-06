import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const middleware = async (request: NextRequest) => {
  const privatePages = ["/course-creation", "/dashboard", "/course"];

  const token =
    (process.env.NODE_ENV === "development"
      ? request.cookies.get("next-auth.session-token")?.value
      : request.cookies.get("__Secure-next-auth.session-token")?.value) ?? "";

  const pathName = request.nextUrl.pathname;

  const isPrivatePage =
    privatePages.includes(pathName) ||
    !!privatePages.map((pv) => pathName.startsWith(pv));

  if (isPrivatePage && !token) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${pathName}`, request.nextUrl)
    );
  }
};

export const config = {
  matcher: ["/course/:path*", "/course-creation", "/dashboard", "/api"],
};
