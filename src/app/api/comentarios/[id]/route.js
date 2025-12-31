import db from "@/lib/db";
import getUsuarioServerSide from "@/utils/getUsuarioServerSide";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const usuario = await getUsuarioServerSide();

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    const { id } = await params;

    const { conteudo, avaliacao } = await req.json();

    if (!conteudo || !avaliacao) {
      return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
    }

    if (typeof conteudo !== typeof "") {
      return NextResponse.json(
        { error: "O contéudo do comentário é inválido." },
        { status: 400 }
      );
    }

    if (typeof avaliacao !== typeof 1) {
      return NextResponse.json(
        { error: "A avaliação do produto é inválida." },
        { status: 400 }
      );
    }

    await db.query(
      `UPDATE FROM comentarios 
        SET conteudo = $1, avaliacao_produto = $2
      WHERE id = $3 AND id_usuario = $4`,
      [conteudo, avaliacao, id, usuario.id]
    );

    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.log("Erro ao atualizar um comentário", err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const usuario = await getUsuarioServerSide();

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    const { id } = await params;

    await db.query(
      `DELETE FROM comentarios 
      WHERE id = $1 AND id_usuario = $2`,
      [id, usuario.id]
    );
  } catch (err) {
    console.log("Erro ao excluir comentário", err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
