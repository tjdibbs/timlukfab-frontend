import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: number;
  caller: string;
  type: string;
  iat: number;
  exp: number;
}

const guestRoutes = ['/login', '/register'];
const protectedRoutes = ['/verify-email', '/verfied', '/checkout'];

function decodeToken(token: string): DecodedToken | null {
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}

function isTokenExpired(token: DecodedToken): boolean {
  const currentTime = Math.floor(Date.now() / 1000);
  return token.exp < currentTime; // token has expired if the expiration time is less than the current time
}

function checkIfTokenIsExpired(request: NextRequest): boolean {
  const token = request.cookies.get('auth')?.value;

  if (!token) return true;

  try {
    const { refreshToken } = JSON.parse(token) as {
      id: number;
      token: string;
      refreshToken: string;
    };

    const decodedToken = decodeToken(refreshToken);

    return !decodedToken || isTokenExpired(decodedToken);
  } catch (error) {
    console.error('Error parsing or decoding token:', error);
    return true;
  }
}

function checkIfRouteIsGuest(request: NextRequest) {
  const { pathname } = request.nextUrl;
  return guestRoutes.includes(pathname);
}

function checkIfRouteIsProtected(request: NextRequest) {
  const { pathname } = request.nextUrl;
  return protectedRoutes.includes(pathname);
}

export const middleware = (request: NextRequest, response: NextResponse) => {
  const { pathname, searchParams } = request.nextUrl;

  if (checkIfRouteIsGuest(request)) {
    const auth = request.cookies.get('auth');

    if (auth?.value && !searchParams.get('expired')) {
      return NextResponse.redirect(new URL('/account', request.url));
    }
    return NextResponse.next();
  }

  if (pathname.includes('/account') || checkIfRouteIsProtected(request)) {
    const auth = request.cookies.get('auth');
    if (!auth?.value) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
    if (checkIfTokenIsExpired(request)) {
      request.cookies.delete('auth');
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('redirect', request.nextUrl.pathname);
      url.searchParams.set('expired', 'true');
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (pathname === '/verify-email') {
    const id = request.cookies.get('email-verification');
    if (!id?.value) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    NextResponse.next();
  }
};

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
