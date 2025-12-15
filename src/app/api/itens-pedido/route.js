import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { ids_pedidos } = await req.json();

    if (!ids_pedidos || ids_pedidos.length === 0) {
      return NextResponse.json(
        { error: "IDs dos pedidos inválido." },
        { status: 400 }
      );
    }

    const result = await db.query(
      `SELECT *
             FROM itens_pedido
             WHERE id_pedido = ANY($1)`,
      [ids_pedidos]
    );

    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    console.log("Erro ao listar itens pedido:", error);
    return NextResponse.json(
      { error: "Erro ao listar itens pedido" },
      { status: 500 }
    );
  }
}
