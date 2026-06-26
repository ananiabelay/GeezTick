import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  let res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = req.nextUrl;

  // Redirect logged-in users from "/" , "/login", and "/signup" to "/dd"
  if (
    user &&
    (
      pathname === '/' ||
      pathname.startsWith('/login') ||
      pathname.startsWith('/signup')
    )
  ) {
    return NextResponse.redirect(new URL('/dd', req.url));
  }

  // Protect /view routes
  if (!user && pathname.startsWith('/view')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/', '/login/:path*', '/signup/:path*', '/view/:path*'],
};