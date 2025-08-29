import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await db.query("SELECT * FROM tb_carrinhos");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Erro ao listar carrinhos:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
