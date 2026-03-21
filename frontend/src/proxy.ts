import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/login', '/register'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = PUBLIC_PATHS.includes(pathname);
  const token = request.cookies.get('auth_session')?.value;

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && isPublic) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
