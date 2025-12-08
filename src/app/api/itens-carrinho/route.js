import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import getUsuarioServerSide from "@/lib/getUsuarioServerSide";
import db from "@/lib/db";

export async function GET() {
  try {
    const usuario = await getUsuarioServerSide();
    const idUsuario = usuario?.id;
    if (!idUsuario) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 400 }
      );
    }

    const carrinhos = await db.query(
      "SELECT * FROM carrinhos WHERE id_usuario = $1",
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

    if (!idCarrinho) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const result = await db.query(
      "SELECT * FROM itens_carrinho WHERE id_carrinho = $1",
      [idCarrinho]
    );

    return NextResponse.json({ items: result.rows });
  } catch (error) {
    console.error("Erro ao listar produtos do carrinho:", error);
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

    const carrinhos = await db.query(
      "SELECT * FROM carrinhos WHERE id_usuario = $1",
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

    const id = uuidv4();

    await db.query(
      `INSERT INTO itens_carrinho (id, id_carrinho, id_produto, quantidade) 
       VALUES ($1, $2, $3, $4) 
       ON CONFLICT (id_carrinho, id_produto) 
       DO UPDATE SET quantidade = itens_carrinho.quantidade + EXCLUDED.quantidade;`,
      [id, idCarrinho, idProduto, quantidade]
    );

    const result = await db.query(
      "SELECT * FROM itens_carrinho WHERE id_carrinho = $1",
      [idCarrinho]
    );

    return NextResponse.json({ items: result.rows });
  } catch (error) {
    console.error("Erro ao adicionar produto ao carrinho:", error);
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

    const { idProduto, quantidade } = await req.json();
    if (!idProduto) {
      return NextResponse.json({ error: "Produto inválido" }, { status: 400 });
    }

    const carrinhos = await db.query(
      "SELECT * FROM carrinhos WHERE id_usuario = $1",
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

    if (quantidade < 1) {
      await db.query(
        "DELETE FROM itens_carrinho WHERE id_carrinho = $1 AND id_produto = $2",
        [idCarrinho, idProduto]
      );
    } else {
      await db.query(
        `UPDATE itens_carrinho 
         SET quantidade = $1 
         WHERE id_carrinho = $2 AND id_produto = $3`,
        [quantidade, idCarrinho, idProduto]
      );
    }

    const result = await db.query(
      "SELECT * FROM itens_carrinho WHERE id_carrinho = $1",
      [idCarrinho]
    );

    return NextResponse.json({ items: result.rows });
  } catch (error) {
    console.error("Erro ao atualizar quantidade do carrinho:", error);
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

    const { idProduto } = await req.json();
    if (!idProduto) {
      return NextResponse.json(
        { error: "ID do produto inválido" },
        { status: 400 }
      );
    }

    const carrinhos = await db.query(
      "SELECT * FROM carrinhos WHERE id_usuario = $1",
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

    await db.query(
      "DELETE FROM itens_carrinho WHERE id_carrinho = $1 AND id_produto = $2",
      [idCarrinho, idProduto]
    );

    const result = await db.query(
      "SELECT * FROM itens_carrinho WHERE id_carrinho = $1",
      [idCarrinho]
    );

    return NextResponse.json({ items: result.rows });
  } catch (error) {
    console.error("Erro ao deletar produto do carrinho:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
