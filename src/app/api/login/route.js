import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, senha } = await req.json();

  try {
    const result = await db.query(
      "SELECT * FROM tb_consumidores WHERE email = $1",
      [email]
    );

    const consumidor = result.rows[0];

    if (!consumidor || !(await bcrypt.compare(senha, consumidor.senha))) {
      return NextResponse.json(
        { error: "Credenciais inválidas!" },
        { status: 401 }
      );
    }

    return NextResponse.json({ consumidor }, { status: 200 });

    // const token = await gerarToken({
    //   id: consumidor.id,
    //   nome: consumidor.nome,
    //   email: consumidor.email,
    //   cep: consumidor.cep,
    //   genero: consumidor.genero,
    // });

    // // cria a resposta
    // const response = NextResponse.json({
    //   mensagem: "Login feito com sucesso!",
    //   usuario: {
    //     nome: consumidor.nome,
    //     email: consumidor.email,
    //     cep: consumidor.cep,
    //     genero: consumidor.genero,
    //   },
    // });

    // // define o cookie no response
    // response.cookies.set("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   path: "/",
    //   maxAge: 60 * 60 * 5, // 5 horas
    // });

    // return response;
  } catch (error) {
    console.error("Erro ao autenticar:", error);
    return NextResponse.json(
      { error: "Erro ao autenticar um usuário." },
      { status: 500 }
    );
  }
}
