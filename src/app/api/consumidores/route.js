import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const result = await db.query("SELECT * FROM tb_consumidores");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Erro ao listar consumidores:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { nome, email, cep, genero, senha } = await request.json();
    await db.query(
      "INSERT INTO tb_consumidores (nome, email, cep, genero, senha) VALUES ($1, $2, $3, $4, $5)",
      [nome, email, cep, genero, senha]
    );
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error adding consumidor:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
