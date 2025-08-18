import db from "@/lib/db";
import { fakeProducts } from "@/lib/fakeDataBase";
import { NextResponse } from "next/server";

export async function GET({ params }) {
  try {
    const { id } = params;
    // const result = await db.query("SELECT * FROM tb_produtos WHERE id = $1", [id]);
    // return NextResponse(result.rows[0]);
    return NextResponse(fakeProducts.filter((product) => product.id === id));
  } catch (error) {
    console.log("Erro ao buscar produto:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 401 }
    );
  }
}
