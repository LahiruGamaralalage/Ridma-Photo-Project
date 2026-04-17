import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const path = request.nextUrl.pathname;

  if (path.startsWith("/admin/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    try {
      await decrypt(session);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  if (path === "/admin" && session) {
    try {
      await decrypt(session);
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } catch (error) {
      // Invalid session, let them stay on login page
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/dashboard/:path*"],
};
