import { verificarToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const autenticado = token ? await verificarToken(token) : null;

  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/shopCar") || pathname.startsWith("/profile")) {
    if (!autenticado) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (
    (pathname.startsWith("/login") || pathname.startsWith("/signUp")) &&
    autenticado
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
