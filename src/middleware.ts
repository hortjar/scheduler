import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/meeting(.*)"],
  ignoredRoutes: ["(/api/)(.*)", "/(.*)(.js)", "/(.*)(.ico)"],
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)", "/meeting/(.*)"],
};
