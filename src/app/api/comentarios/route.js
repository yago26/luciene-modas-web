import db from "@/lib/db";
import getUsuarioServerSide from "@/utils/getUsuarioServerSide";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(req) {
  try {
    // Criar o sistema de respostas
    // * Verificar respostas depois
    // Criar um tem_resposta posteriormente

    const usuario = await getUsuarioServerSide();

    const { searchParams } = new URL(req.url);

    const idProduto = searchParams.get("id_produto");

    let ordenar = "";

    let count = 0;
    const values = [];

    if (usuario) {
      ordenar = `
        ORDER BY CASE
          WHEN c.fixado = true THEN 1
          WHEN c.id_usuario = $${++count} THEN 2
          ELSE 3
        END,
        c.data_criacao DESC
      `;
      values.push(usuario.id);
    } else {
      ordenar = `ORDER BY c.data_criacao DESC`;
    }

    const query = `SELECT 
        c.id, 
        c.conteudo, 
        c.avaliacao_produto, 
        c.data_criacao, 
        JSON_AGG (
          JSON_BUILD_OBJECT(
            'id', u.id, 
            'nome', u.nome,
            'imagem', u.imagem,
            'username', u.username,
            'role', u.role
          )
        ) AS usuario
      FROM 
        comentarios c JOIN usuarios u 
        ON c.id_usuario = u.id
      WHERE 
        c.id_produto = $${++count} 
        AND c.resposta_de IS NULL
      GROUP BY 
        c.id, 
        c.conteudo, 
        c.avaliacao_produto,
        c.data_criacao
      ${ordenar}`;

    values.push(idProduto);

    const result = await db.query(query, values);

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
