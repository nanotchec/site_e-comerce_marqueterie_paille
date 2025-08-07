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
  
  const publicPaths = ['/admin/login', '/api/auth/login'];
  const isApiAdmin = pathname.startsWith('/api/admin');
  const isAdminPage = pathname.startsWith('/admin');
  const isPublicAdminPage = publicPaths.some((p) => pathname.startsWith(p));

  const authToken = req.cookies.get('auth-token')?.value;
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error('CRITICAL: JWT_SECRET is not set.');
    return new NextResponse('Internal Server Error', { status: 500 });
  }

  const secret = new TextEncoder().encode(jwtSecret);

  // Protect admin API routes with JSON responses
  if (isApiAdmin) {
    if (!authToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const decoded = await verifyJWT(authToken, secret);
    if (!decoded) {
      const response = NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      response.cookies.delete('auth-token');
      return response;
    }
    return NextResponse.next();
  }

  // Protect admin pages with redirects
  if (isAdminPage) {
    if (!isPublicAdminPage) {
      if (!authToken) {
        const url = req.nextUrl.clone();
        url.pathname = '/admin/login';
        return NextResponse.redirect(url);
      }
      const decoded = await verifyJWT(authToken, secret);
      if (!decoded) {
        const url = req.nextUrl.clone();
        url.pathname = '/admin/login';
        const response = NextResponse.redirect(url);
        response.cookies.delete('auth-token');
        return response;
      }
    } else if (authToken) {
      const decoded = await verifyJWT(authToken, secret);
      if (decoded) {
        const url = req.nextUrl.clone();
        url.pathname = '/admin/dashboard';
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};