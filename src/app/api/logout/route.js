import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.json(
    { mensagem: "Logout feito com sucesso!" },
    { status: 200 }
  );

  // Apaga o cookie `token`
  res.cookies.set("token", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0), // expira imediatamente
  });

  return res;
}
