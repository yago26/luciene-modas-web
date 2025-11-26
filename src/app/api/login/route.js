import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, senha } = await req.json();

  try {
    const result = await db.query(
      "SELECT * FROM tb_usuarios WHERE email = $1",
      [email]
    );

    const usuario = result.rows[0];

    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return NextResponse.json(
        { error: "Credenciais inválidas!" },
        { status: 401 }
      );
    }

    return NextResponse.json({ usuario }, { status: 200 });
  } catch (error) {
    console.error("Erro ao autenticar:", error);
    return NextResponse.json(
      { error: "Erro ao autenticar um usuário." },
      { status: 500 }
    );
  }
}
