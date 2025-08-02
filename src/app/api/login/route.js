import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, senha } = await req.json();

  try {
    const result = await pool.query(
      "SELECT * FROM tb_consumidores WHERE email = $1",
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      console.log("Erro! Usuário não existe.");
      return NextResponse.json(
        { error: "Erro! Usuário não existe." },
        { status: 401 }
      );
    }
    if (!(await bcrypt.compare(senha, user.senha))) {
      console.log("Erro! Senha incorreta.");
      return NextResponse.json(
        { error: "Erro! Senha incorreta." },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
        nome: user.nome,
        email: user.email,
        cep: user.cep,
        genero: user.genero,
      },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );

    return NextResponse.json(
      {
        token,
        mensagem: "Login feito com sucesso!",
        usuario: {
          nome: user.nome,
          email: user.email,
          cep: user.cep,
          genero: user.genero,
        },
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`,
        },
      }
    );
  } catch (error) {
    console.log(
      "Erro ao autenticar um usuário. Provavelmente a aplicação não está conectada ao Banco de Dados do sistema."
    );
    return NextResponse.json(
      { error: "Erro ao autenticar um usuário." },
      { status: 500 }
    );
  }
}
