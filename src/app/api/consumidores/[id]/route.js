import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
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
