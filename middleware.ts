import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_ORIGIN = "https://www.redfernplasteringsolutions.com.au";

const REDIRECT_HOSTS = new Set([
  "redfern-plastering.vercel.app",
  "redfernplasteringsolutions.com.au",
]);

function requestHost(request: NextRequest): string {
  // Use the Host the browser sent. vercel.json matches the same header at the edge.
  return (request.headers.get("host") ?? request.nextUrl.host)
    .split(",")[0]
    .trim()
    .toLowerCase()
    .replace(/:\d+$/, "");
}

export function middleware(request: NextRequest) {
  const host = requestHost(request);
  if (!REDIRECT_HOSTS.has(host)) return NextResponse.next();

  const destination = new URL(
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
    CANONICAL_ORIGIN,
  );
  return NextResponse.redirect(destination, 301);
}

export const config = {
  matcher: "/:path*",
};
