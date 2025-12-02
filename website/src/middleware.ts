import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Admin routes protection
    if (pathname.startsWith('/admin')) {
      if (token?.role !== 'admin') {
        return NextResponse.redirect(new URL('/auth/signin?error=unauthorized', req.url));
      }
    }

    // Mentor routes protection
    if (pathname.startsWith('/mentor')) {
      if (token?.role !== 'mentor' && token?.role !== 'admin') {
        return NextResponse.redirect(new URL('/auth/signin?error=unauthorized', req.url));
      }
    }

    // Fellow routes protection
    if (pathname.startsWith('/fellow')) {
      if (token?.role !== 'fellow' && token?.role !== 'admin') {
        return NextResponse.redirect(new URL('/auth/signin?error=unauthorized', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Public routes that don't require authentication
        const publicRoutes = ['/', '/program', '/research', '/people', '/apply', '/news'];
        const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`));

        if (isPublicRoute) {
          return true;
        }

        // API routes that don't require authentication
        if (pathname.startsWith('/api/auth')) {
          return true;
        }

        // Protected routes require authentication
        if (pathname.startsWith('/admin') || pathname.startsWith('/mentor') || pathname.startsWith('/fellow')) {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|manifest.json|robots.txt).*)',
  ],
};