import db from "@/lib/db";
import getUsuarioServerSide from "@/utils/getUsuarioServerSide";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    // Criar o sistema de respostas
    // * Verificar respostas depois
    // Criar um tem_resposta posteriormente

    const usuario = await getUsuarioServerSide();

    let ordenar = "";
    if (usuario) {
      ordenar = `
            ORDER BY 
                CASE
                    WHEN id_usuario = $1 THEN 1
                END,
                data_criacao DESC
            `;
    }
    const result = await db.query(
      `SELECT * FROM comentarios WHERE resposta_de = null ${ordenar}`
    );

    return NextResponse.json({ data: result.rows }, { status: 200 });
  } catch (err) {
    console.log("Erro ao listar comentários", err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const usuario = await getUsuarioServerSide();

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    const { conteudo, avaliacao_produto, idProduto } = await req.json();

    if (!conteudo || !avaliacao_produto || !idProduto) {
      return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
    }

    const dataBrasil = new Date().toLocaleString("sv-SE", {
      timeZone: "America/Sao_Paulo",
    });

    await db.query(
      `INSERT INTO comentarios 
            (id, conteudo, avaliacao_produto, data_criacao, id_usuario, id_produto) 
        VALUES 
            ($1, $2, $3, $4, $5, $6)`,
      [uuidv4(), conteudo, avaliacao_produto, dataBrasil, usuario.id, idProduto]
    );

    return NextResponse.json({ status: 201 });
  } catch (err) {
    console.log("Erro ao adicionar um comentário", err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
