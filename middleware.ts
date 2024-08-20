import JWT from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

function logRequest(request: NextRequest) {
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);
}

function verifyToken(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token");
    if (!token) {
      console.log("Token does not exist");
      return;
      //   return NextResponse.redirect(new URL("/404", request.url));
    }

    const SECRET_KEY = process.env.SECRET_KEY as string;

    const user = JWT.verify(token, SECRET_KEY);

    // Clone the request headers and add the user information
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-data", JSON.stringify(user));

    // Return the response with modified headers
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error: any) {
    // In case of an error, redirect to an error page
    const errorUrl = new URL("/reset-password", request.url);
    errorUrl.searchParams.set("error", error.message);
    return NextResponse.redirect(errorUrl);
  }
}

export const middleware = (request: NextRequest, response: NextResponse) => {
  const { pathname } = request.nextUrl;

  logRequest(request);

  if (pathname === "/reset-password") {
    return verifyToken(request);
  }
};

export const config = {
  matcher: [
    "/forgotten-password",
    "/reset-password",
    "/sign-in",
    "/sign-up",
    "/support",
    "/wishlist",
    "/shipping",
    "/orders",
    "/cart",
    "/email/:path*",
    "/checkout/:path*",
    "/return_refund",
    "/collections/:path*",
    "/products/:path*",
    "/",
  ],
};
