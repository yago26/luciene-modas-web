import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await db.query("SELECT * FROM produtos WHERE estoque > 0");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.log("Erro ao listar produtos disponíveis", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
