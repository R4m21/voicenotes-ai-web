import { NextResponse, type NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
  const token = request.cookies?.get("token")?.value;

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register");

  const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard");

  // Not logged in → dashboard block
  if (!token && isDashboardRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Already logged in → login/register block
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
};

// Define where middleware runs
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
