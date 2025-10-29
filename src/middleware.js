import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET }); // pega o token com base na requisição e compara com os tokens gerados com o sistema
  const { pathname } = req.nextUrl; // pathname é a url

  const publics =
    pathname.startsWith("/login") || pathname.startsWith("/signUp");

  const publics_auth =
    pathname.startsWith("/profile") || pathname.startsWith("/shopCar");

  const privates = pathname.startsWith("/admin");

  if (!token && publics_auth) {
    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  if (token && publics) {
    const url = new URL("/profile", req.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  if (privates) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/shopCar/:path*",
    "/login/:path*",
    "/signUp/:path*",
    "/admin/:path*",
  ],
};

// É interessante fazer a validação no componente para que a página não seja pré gerada em cache
