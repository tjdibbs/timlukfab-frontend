import { NextRequest, NextResponse } from "next/server";


const guestRoutes = ["/login", "/register"];
const protectedRoutes = ["/verify-email", "/verfied"]

function CheckIfRouteIsGuest(request: NextRequest) {
  const { pathname } = request.nextUrl;
  return guestRoutes.includes(pathname);
}

function CheckIfRouteIsProtected(request: NextRequest) {
  const { pathname } = request.nextUrl;
  return protectedRoutes.includes(pathname);
}

function logRequest(request: NextRequest) {
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);
}

export const middleware = (request: NextRequest, response: NextResponse) => {
  const { pathname } = request.nextUrl;

  if (CheckIfRouteIsGuest(request)) {
    const auth = request.cookies.get("auth");
    if (auth?.value) {
      return NextResponse.redirect(new URL("/account", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.includes("/account") || CheckIfRouteIsProtected(request)) {
    const auth = request.cookies.get("auth");
    if (!auth?.value) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  if (pathname === "/verify-email") {
    const id = request.cookies.get("email-verification");
    if (!id?.value) {
      return NextResponse.redirect(new URL("/", request.url))
    }
    NextResponse.next();
  }
};

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
