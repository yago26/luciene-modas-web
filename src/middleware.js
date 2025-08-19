// importar jose futuramente
// Error: The edge runtime does not support Node.js 'crypto' module.
import { NextResponse } from "next/server";
import { verificarToken } from "@/lib/auth";

const PRIVATE = ["/shopCar", "/profile"];
const PUBLIC = ["/login", "/signUp"];

export default async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = (await req.cookies.get("token")?.value) ?? "";

  const match = (list) =>
    list.some((p) => {
      return pathname.startsWith(p);
    });

  const isPrivate = match(PRIVATE);
  const isPublic = match(PUBLIC);

  // suporta verificarToken síncrona ou assíncrona
  const autenticado = verificarToken(token);

  if (isPrivate && !autenticado) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isPublic && autenticado) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
