import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const result = await db.query("SELECT * FROM tb_produtos WHERE id = $1", [
      id,
    ]);

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

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    db.query("DELETE FROM tb_produtos WHERE id = $1", [id]);

    // Deletar a imagem do blob também

    return NextResponse.json({ mensagem: "Produto removido" }, { status: 201 });
  } catch (error) {
    console.log("Erro ao remover produto", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
