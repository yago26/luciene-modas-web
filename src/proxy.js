import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function proxy(req) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;

  const publics =
    pathname.startsWith("/login") || pathname.startsWith("/sign-up");

  if (token && publics) {
    const url = new URL("/perfil", req.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  const publics_auth =
    pathname.startsWith("/perfil") ||
    pathname.startsWith("/carrinho") ||
    pathname.startsWith("/checkout");

  if (!token && publics_auth) {
    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // const privates = pathname.startsWith("/admin");

  // if (privates) {
  //   if (!token) {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }
  //   if (token.role !== "administrador") {
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }
  // }
}

export const config = {
  matcher: [
    "/perfil/:path*",
    "/carrinho/:path*",
    "/checkout/:path*",
    "/login/:path*",
    "/sign-up/:path*",
    // "/admin/:path*",
  ],
};

// É interessante fazer a validação no componente para que a página não seja pré gerada em cache
