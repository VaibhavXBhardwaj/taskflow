import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const AUTH_ROUTES = ["/login", "/signup"];
const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("taskflow_session")?.value;

  let session = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      session = payload;
    } catch {
      session = null;
    }
  }

  if (session && AUTH_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!session && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};