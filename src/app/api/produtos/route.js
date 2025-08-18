import db from "@/lib/db";
import { fakeProducts } from "@/lib/fakeDataBase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // const result = await db.query("SELECT * FROM tb_produtos");
    // return NextResponse.json(result.rows);
    return NextResponse.json(fakeProducts);
  } catch (error) {
    console.log("Erro ao listar produtos", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 401 }
    );
  }
}
