import { v4 as uuidv4 } from "uuid";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { idConsumidor } = await req.json();
    const resultCarrinho = await db.query(
      "SELECT * FROM tb_carrinhos WHERE id_consumidor = $1",
      [idConsumidor]
    );
    const idCarrinho = resultCarrinho.rows[0].id;

    const result = await db.query(
      "SELECT * FROM rl_carrinhos_produtos_itens_carrinho WHERE id_carrinho = $1",
      [idCarrinho]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Erro ao listar produtos do carrinho:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  // criar
  try {
    const { idConsumidor, idProduto, quantidade } = await req.json();

    const resultCarrinho = await db.query(
      "SELECT * FROM tb_carrinhos WHERE id_consumidor = $1",
      [idConsumidor]
    );
    const idCarrinho = resultCarrinho.rows[0].id;

    if (!idCarrinho || !idProduto || !quantidade) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const id = uuidv4();
    await db.query(
      `INSERT INTO 
      rl_carrinhos_produtos_itens_carrinho (id, id_carrinho, id_produto, quantidade) 
      VALUES ($1, $2, $3, $4) 
      CONFLICT (id_carrinho, id_produto) 
      DO UPDATE SET quantidade = rl_carrinhos_produtos_itens_carrinho.quantidade + EXCLUDED.quantidade;`,
      [id, idCarrinho, idProduto, quantidade]
    );
    return NextResponse.json(
      { message: "Produto adicionado no carrinho" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao adicionar produto ao carrinho:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  // atualizar
  try {
    const { idCarrinho, idProduto, quantidade } = await req.json();
    await db.query(
      "UPDATE rl_carrinhos_produtos_itens_carrinho SET quantidade = $1 WHERE id_carrinho = $2 AND id_produto = $3",
      [quantidade, idCarrinho, idProduto]
    );
    return NextResponse.json(
      { message: "Quantidade atualizada" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  // deletar
  try {
    const { idCarrinho, idProduto } = await req.json();
    await db.query(
      "DELETE FROM rl_carrinhos_produtos_itens_carrinho WHERE id_carrinho = $1 AND id_produto = $2",
      [idCarrinho, idProduto]
    );
    return NextResponse.json(
      { message: "Produto removido do carrinho" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
