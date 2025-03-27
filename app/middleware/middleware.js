import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  async function middleware(req) {
    const token = await getToken({
      req: req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    console.log(token);
    

    switch (token.roleId) {
      case 2:
        if (!req.nextUrl.pathname.startsWith('/user')) {
          return NextResponse.redirect(new URL('/user/dashboard', req.url));
        }
        break;
      case 1:
        if (!req.nextUrl.pathname.startsWith('/admin')) {
          return NextResponse.redirect(new URL('admin/dashboard', req.url));
        }
        break;
      default:
        return NextResponse.redirect(new URL('/login', req.url));
    }
  }
)
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}