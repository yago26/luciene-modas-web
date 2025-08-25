import db from "@/lib/db";
import { fakeProducts } from "@/lib/fakeDataBase";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    // const result = await db.query("SELECT * FROM tb_produtos");
    // return NextResponse.json(result.rows);
    return NextResponse.json(fakeProducts);
  } catch (error) {
    console.log("Erro ao listar produtos", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { nome, sobre, valor, categoria, imagem, estoque } = await req.json();
    const id = uuidv4(); 

    db.query("INSERT INTO tb_produtos (id, nome, sobre, valor, categoria, imagem, estoque) VALUES ($1, $2, $3, $4, $5, $6)", [id, nome, sobre, valor, categoria, imagem, estoque]);

    return NextResponse.json(
      { mensagem: "Produto adicionado" },
      { status: 201 }
    );
  } catch(error) {
    console.log("Erro ao adicionar um novo produto", error);
    return NextResponse.json({error: "Internal Server Error"}, { status: 500 });
  }
}
