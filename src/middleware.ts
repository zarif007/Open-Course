import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const middleware = async (request: NextRequest) => {
  const privateRoutes = ["/course-creation"];
  const token = request.cookies.get("next-auth.session-token")?.value ?? "";
  const pathName = request.nextUrl.pathname;

  if (privateRoutes.includes(pathName) && !token) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${pathName}`, request.nextUrl)
    );
  }
};

export const config = {
  matcher: ["/course", "/course-creation", "/api"],
};
