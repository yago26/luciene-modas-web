// middleware.ts
import { NextResponse } from "next/server";
import { verificarToken } from "@/lib/auth";

const PRIVATE = ["/shopCar", "/profile"];
const PUBLIC = ["/login", "/signUp"]; // inclua as duas grafias que você usa

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = (await req.cookies.get("token")?.value) ?? "";

  const match = (list) =>
    list.some((p) => pathname === p || pathname.startsWith(p + "/"));

  const isPrivate = match(PRIVATE);
  const isPublic = match(PUBLIC);

  // suporta verificarToken síncrona ou assíncrona
  const valid = token
    ? await Promise.resolve(verificarToken(token)).catch(() => null)
    : null;

  if (isPrivate && !valid) {
    const url = new URL("/login", req.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  if (isPublic && valid) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// IMPORTANTÍSSIMO: não interceptar estáticos nem arquivos da /public
export const config = {
  matcher: [
    // exclui /api, internals do Next e QUALQUER arquivo com ponto (ex.: /logo.png, /styles.css)
    "/((?!api|_next/s tatic|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
