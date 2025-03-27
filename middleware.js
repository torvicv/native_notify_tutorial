import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  async function middleware(req) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const { pathname } = req.nextUrl; // Extraemos la ruta

    // Permitir acceso a /login sin redireccionar de nuevo
    if (!token) {
      if (pathname === '/login') {
        return NextResponse.next(); // Permite el acceso sin redirigir
      }
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Redirigir según el rol del usuario
    if (token.roleId === 2) {
      if (!pathname.startsWith('/user')) {
        return NextResponse.redirect(new URL('/user/dashboard', req.url));
      }
    } else if (token.roleId === 1) {
      if (!pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: '/login',
    },
  }
);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};