import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const result = await db.query("SELECT * FROM produtos WHERE id = $1", [id]);
    // const result = await db.query("SELECT p.id, p.nome, p.sobre, p.imagem FROM produtos p WHERE id = $1", [id]);

    if (!result) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.log("Erro ao buscar produto:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import { del } from "@vercel/blob";

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const { url } = await req.json();

    await db.query("DELETE FROM produtos WHERE id = $1", [id]);

    await del(url);

    return NextResponse.json({ mensagem: "Produto removido" }, { status: 201 });
  } catch (error) {
    console.log("Erro ao remover produto", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { error: "ID do produto não fornecido" },
        { status: 400 }
      );
    }

    let { nome, sobre, valor, categoria, subcategoria, imagem, estoque } =
      await req.json();

    // ====== NORMALIZAÇÕES ======

    // Formata valor, se existir
    if (valor !== undefined && valor !== null) {
      valor = String(valor).replace(",", ".");
    }

    // Formata categoria
    if (categoria) {
      categoria = categoria.toLowerCase();
      if (categoria === "cosméticos") categoria = "cosmeticos";
    }

    // Formata subcategoria
    if (subcategoria) {
      subcategoria = subcategoria.toLowerCase();
    }

    // ====== MONTAGEM DINÂMICA DA QUERY ======

    const campos = [];
    const valores = [];
    let contador = 1;

    if (nome) {
      campos.push(`nome = $${contador++}`);
      valores.push(nome.trim());
    }

    if (sobre) {
      campos.push(`sobre = $${contador++}`);
      valores.push(sobre);
    }

    if (valor) {
      campos.push(`valor = $${contador++}`);
      valores.push(valor);
    }

    if (categoria) {
      campos.push(`categoria = $${contador++}`);
      valores.push(categoria);
    }

    if (subcategoria) {
      campos.push(`subcategoria = $${contador++}`);
      valores.push(subcategoria);
    }

    if (imagem) {
      campos.push(`imagem = $${contador++}`);
      valores.push(imagem);
    }

    if (estoque !== undefined) {
      campos.push(`estoque = $${contador++}`);
      valores.push(estoque);
    }

    // Verifica se há algum campo para atualizar
    if (campos.length === 0) {
      return NextResponse.json(
        { error: "Nenhum campo válido enviado para atualização" },
        { status: 400 }
      );
    }

    // Adiciona o ID no final
    valores.push(id);

    const query = `
      UPDATE produtos
      SET ${campos.join(", ")}
      WHERE id = $${contador}
    `;

    await db.query(query, valores);

    return NextResponse.json(
      { mensagem: "Produto atualizado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
