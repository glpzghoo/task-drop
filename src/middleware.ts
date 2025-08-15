import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

async function getPayload(req: NextRequest) {
  const token = req.cookies.get('AccessToken')?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as {
      id: string;
    };
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const payload = await getPayload(req);
  const isLoggedIn = Boolean(payload);

  if ((pathname === '/nevtreh' || pathname === '/burtguuleh') && isLoggedIn) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/nevtreh', '/burtguuleh'],
};
