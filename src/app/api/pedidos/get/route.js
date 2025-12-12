import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const form = await req.formData();
    const id = form.get("id");

    const result = await db.query(
      "SELECT * FROM pedidos WHERE id_usuario = $1 ORDER BY data_criacao DESC",
      [id]
    );

    return NextResponse.json({ data: result.rows, success: true });
  } catch (error) {
    console.log("Erro ao listar pedidos", error);
    return NextResponse.json(
      { error: "Erro interno ao listar pedidos." },
      { status: 500 }
    );
  }
}
