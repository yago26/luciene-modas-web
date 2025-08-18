// middleware.ts
import { NextResponse } from "next/server";
import { verificarToken } from "@/lib/auth";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  // Rotas privadas
  const rotasPrivadas = ["/shopCar", "/checkout", "/profile"];

  if (rotasPrivadas.some((rota) => req.nextUrl.pathname.startsWith(rota))) {
    if (!token || !verificarToken(token)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Rotas públicas que não devem ser acessadas por logados
  const rotasPublicas = ["/login", "/cadastro"];

  if (rotasPublicas.some((rota) => req.nextUrl.pathname.startsWith(rota))) {
    if (token && verificarToken(token)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Rotas de administradores ???

  return NextResponse.next();
}
