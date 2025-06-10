import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await db.query("DELETE FROM tb_consumidores WHERE id = $1", [id]);
    return NextResponse.json({ message: "Consumidor removido com sucesso" });
  } catch (error) {
    console.error("Erro ao remover consumidor:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
