import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params.json();

    const result = await db.query(
      "SELECT * FROM pedidos WHERE id_usuario = $1 ORDER BY data_criacao DESC",
      [id]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.log("Erro ao listar pedidos", error);
    return NextResponse.json(
      { error: "Erro interno ao listar pedidos." },
      { status: 500 }
    );
  }
}
