import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./navigation";

const handleI18nRouting = createMiddleware(routing);

export function proxy(request: NextRequest) {
  return handleI18nRouting(request);
}

export default proxy;

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
