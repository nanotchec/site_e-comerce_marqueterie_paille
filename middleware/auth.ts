import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// This is a simplified middleware example for API routes within the App Router.
// For page-based protection, you would use a different approach (e.g., in a layout or page component).

type Role = 'ADMIN' | 'PRODUCT_EDITOR' | 'ANALYST';

export function withAuth(
  handler: (req: NextRequest, params?: any) => Promise<NextResponse>,
  requiredRoles: Role[] = []
) {
  return async (req: NextRequest, params?: any) => {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userRole = token.role as Role;

    if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    // You can add the user to the request if needed, but it's often handled differently in App Router.
    // For API routes, you might just pass the token info to the handler if necessary.

    return handler(req, params);
  };
} 