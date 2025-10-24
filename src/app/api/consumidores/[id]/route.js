import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const result = await db.query(
      "SELECT * FROM tb_consumidores WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Consumidor não encontrado" },
        { status: 404 }
      );
    }
    const consumidor = result.rows[0];
    return NextResponse.json(consumidor, { status: 200 });
  } catch (error) {
    console.log("Erro ao buscar consumidor:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await db.query("DELETE FROM tb_consumidores WHERE id = $1", [id]);

    await db.query("DELETE FROM tb_carrinhos WHERE id_consumidor = $1", [id]);

    return NextResponse.json(
      {
        message: "Consumidor removido com sucesso",
      },
      { status: 204 }
    );
  } catch (error) {
    console.log("Erro ao remover consumidor:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const { nome, cep, genero } = await req.json();

    if (!nome || !cep || !genero) {
      console.log("Dados inválidos");
      return NextResponse.json(
        { error: "Dados inválidos." },
        { status: 400 }
      );
    }

    await db.query(
      "UPDATE tb_consumidores SET nome = $1, cep = $2, genero = $3 WHERE id = $4",
      [nome, cep, genero, id]
    );

    return NextResponse.json(
      { message: "Consumidor atualizado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Erro ao atualizar informações de consumidor:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
