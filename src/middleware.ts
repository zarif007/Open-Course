import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhooks/user",
    "/api/getUser",
    "/api/generateBanner",
    "/courses",
    "/course-landing/(.*)",
    "/api/course",
    "/api/user",
    "/api/courseTopic",
    "/api/enrollState",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
