import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

async function verifyJWT(token: string, secret: Uint8Array): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  const publicPaths = [
    '/admin/login',
    '/api/auth/login',
  ];

  // Allow requests for non-admin API routes, static files, and image optimization
  if (
    !pathname.startsWith('/admin') && 
    !pathname.startsWith('/api/admin')
  ) {
    if (
        pathname.startsWith('/api/') ||
        pathname.startsWith('/_next/') ||
        pathname.includes('.') // for favicon.ico, etc.
    ) {
      return NextResponse.next();
    }
  }

  const isPublicPath = publicPaths.some(p => pathname.startsWith(p));

  const authToken = req.cookies.get('auth-token')?.value;
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error('CRITICAL: JWT_SECRET is not set.');
    // In a real app, you might want to redirect to an error page
    return new NextResponse('Internal Server Error', { status: 500 });
  }

  const secret = new TextEncoder().encode(jwtSecret);

  if (pathname.startsWith('/admin') && !isPublicPath) {
    if (!authToken) {
      const url = req.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }

    const decoded = await verifyJWT(authToken, secret);

    if (!decoded) {
      const url = req.nextUrl.clone();
      url.pathname = '/admin/login';
       // Clear the invalid cookie
      const response = NextResponse.redirect(url);
      response.cookies.delete('auth-token');
      return response;
    }
  }

  // If trying to access login page while already logged in
  if (isPublicPath && authToken) {
      const decoded = await verifyJWT(authToken, secret);
      if (decoded) {
          const url = req.nextUrl.clone();
          url.pathname = '/admin/dashboard';
          return NextResponse.redirect(url);
      }
  }
  
  return NextResponse.next();
}

export const config = {
  // Match all paths except for the ones starting with /api, /_next/static, /_next/image, and favicon.ico
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 