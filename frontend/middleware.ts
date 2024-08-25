import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const response = await fetch(new URL("/api/auth/check", request.url), {
      headers: {
        Cookie: request.headers.get("cookie") || "",
      },
    });

    // TODO: Replace with actual authentication check
    // if (!response.ok) {
    //   console.error(
    //     `Auth check failed: ${response.status} ${response.statusText}`,
    //   );
    //   return NextResponse.redirect(new URL("/login", request.url));
    // }

    // Always allow access for now
    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/editor", "/dashboard"],
};
