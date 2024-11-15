import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // Define protected routes
  const protectedRoutes = ['/', '/dashboard', '/profile']; // Add paths you want to protect

  // Check if the request is for a protected route, and exclude '/auth/login'
  if (
    !token &&
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route)) &&
    !request.nextUrl.pathname.startsWith('/auth/login')
  ) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Allow access to other routes, including '/auth/login'
  return NextResponse.next();
}

// Specify which paths to run the middleware on
export const config = {
    matcher: ['/((?!_next/static|favicon.ico|auth/login|api).*)'], // Exclude _next/static, favicon, and API routes
  };
  
  
