import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import getUsuarioServerSide from "@/utils/getUsuarioServerSide";
import db from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const ids = searchParams.get("ids");

    if (ids) {
      const ids_itens_carrinho = ids.split(",");

      if (ids_itens_carrinho.length === 0) {
        return NextResponse.json([], { status: 200 });
      }

      const itens = await db.query(
        `
      SELECT 
        i.id, i.id_produto, p.nome, p.valor, p.imagem, i.quantidade
      FROM 
      itens_carrinho i JOIN produtos p ON i.id_produto = p.id 
      WHERE i.id = ANY($1::uuid[]) AND p.estoque > 0;  
      `,
        [ids_itens_carrinho]
      );

      return NextResponse.json(itens.rows);
    }

    const usuario = await getUsuarioServerSide();

    const idUsuario = usuario?.id;
    if (!idUsuario) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 400 }
      );
    }

    const carrinhos = await db.query(
      "SELECT id FROM carrinhos WHERE id_usuario = $1",
      [idUsuario]
    );
    const carrinho = carrinhos.rows[0];

    if (!carrinho?.id) {
      return NextResponse.json(
        { error: "Carrinho não encontrado" },
        { status: 404 }
      );
    }
    const idCarrinho = carrinho.id;

    const result = await db.query(
      `SELECT i.id, i.id_produto, p.nome, p.valor, p.imagem, p.estoque, i.quantidade FROM 
      itens_carrinho i JOIN produtos p ON i.id_produto = p.id 
      WHERE id_carrinho = $1 AND p.estoque > 0 
      ORDER BY p.nome`,
      [idCarrinho]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Erro ao listar itens do carrinho:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const usuario = await getUsuarioServerSide();

    const idUsuario = usuario?.id;
    if (!idUsuario) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 400 }
      );
    }

    const { idProduto, quantidade } = await req.json();
    if (!idProduto || !quantidade) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const res = await db.query("SELECT estoque FROM produtos WHERE id = $1", [
      idProduto,
    ]);

    const estoque = res.rows[0]?.estoque;
    if (estoque === undefined) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    if (Number(estoque) < Number(quantidade)) {
      return NextResponse.json(
        { error: "A quantidade não pode exceder o estoque disponível." },
        { status: 404 }
      );
    }

    const carrinhos = await db.query(
      "SELECT id FROM carrinhos WHERE id_usuario = $1",
      [idUsuario]
    );

    const carrinho = carrinhos.rows[0];
    if (!carrinho?.id) {
      return NextResponse.json(
        { error: "Carrinho não encontrado" },
        { status: 404 }
      );
    }

    const idCarrinho = carrinho.id;

    const itemRes = await db.query(
      "SELECT quantidade FROM itens_carrinho WHERE id_carrinho = $1 AND id_produto = $2",
      [idCarrinho, idProduto]
    );

    const quantidadeAtual = itemRes.rows[0]?.quantidade || 0;

    if (Number(quantidadeAtual) + Number(quantidade) > Number(estoque)) {
      return NextResponse.json(
        {
          error: `Estoque insuficiente. Disponível: ${estoque}`,
        },
        { status: 400 }
      );
    }

    if (quantidadeAtual === 0) {
      const id = uuidv4();
      await db.query(
        `INSERT INTO itens_carrinho (id, id_carrinho, id_produto, quantidade)
         VALUES ($1, $2, $3, $4)`,
        [id, idCarrinho, idProduto, quantidade]
      );
    } else {
      await db.query(
        `UPDATE itens_carrinho
         SET quantidade = quantidade + $1
         WHERE id_carrinho = $2 AND id_produto = $3`,
        [quantidade, idCarrinho, idProduto]
      );
    }

    const result = await db.query(
      `SELECT i.id, i.id_produto, p.nome, p.valor, p.imagem, p.estoque, i.quantidade FROM 
      itens_carrinho i JOIN produtos p ON i.id_produto = p.id 
      WHERE id_carrinho = $1 
      ORDER BY p.nome`,
      [idCarrinho]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Erro ao adicionar item ao carrinho:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const usuario = await getUsuarioServerSide();
    const idUsuario = usuario?.id;
    if (!idUsuario) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 400 }
      );
    }

    const { idItemCarrinho, quantidade } = await req.json();
    if (!idItemCarrinho) {
      return NextResponse.json({ error: "Item inválido" }, { status: 400 });
    }

    if (quantidade < 1) {
      await db.query("DELETE FROM itens_carrinho WHERE id = $1", [
        idItemCarrinho,
      ]);
    } else {
      await db.query(
        `UPDATE itens_carrinho 
         SET quantidade = $1 
         WHERE id = $2`,
        [quantidade, idItemCarrinho]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(
      "Erro ao atualizar a quantidade de um item do carrinho:",
      error
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const usuario = await getUsuarioServerSide();

    const idUsuario = usuario?.id;
    if (!idUsuario) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 400 }
      );
    }

    const { idItemCarrinho } = await req.json();
    if (!idItemCarrinho) {
      return NextResponse.json(
        { error: "ID do item inválido" },
        { status: 400 }
      );
    }

    await db.query("DELETE FROM itens_carrinho WHERE id = $1", [
      idItemCarrinho,
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao deletar item do carrinho:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
